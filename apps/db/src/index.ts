import "dotenv/config";
import { buildSchema } from "drizzle-graphql";
import { drizzle } from "drizzle-orm/node-postgres";
import { ApolloServer } from "@apollo/server";
import * as dbSchema from "./db/schema.js";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { useServer } from "graphql-ws/use/ws";
import { increment } from "./utils.js";
import pg from "pg";
import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql/type/index.js";
import { eq } from "drizzle-orm";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool, schema: dbSchema });

const pubsub = new RedisPubSub({
  connection: process.env.REDIS_URL,
  connectionListener: (e) => {
    if (e) console.error(`Error connecting to Redis: ${e}`);
  },
});
const PUBS_UPDATED = "PUBS_UPDATED";
const THEMES_UPDATED = "THEMES_UPDATED";

const { entities } = buildSchema(db);
const originalMutations = entities.mutations;
const wrappedMutations: Record<
  string,
  (typeof originalMutations)[keyof typeof originalMutations]
> = {};

for (const [key, resolver] of Object.entries(originalMutations)) {
  wrappedMutations[key] = {
    ...resolver,
    // @ts-expect-error Typing this with Parameters<typeof resolver.resolve> breaks the build
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: async (...args: [any, any, any, any]) => {
      const result = await resolver.resolve(...args);

      // TODO: Might want to do this in a smarter/more sophisticated way?
      const touchesPubs = key.toLowerCase().includes("pub");
      const touchesThemes = key.toLowerCase().includes("theme");
      const deletes = key.toLowerCase().includes("delete");

      if (touchesPubs || (touchesThemes && deletes)) {
        await pubsub.publish(PUBS_UPDATED, {
          pubsSubscription: await db.query.pubs.findMany(),
        });
      }
      if (touchesThemes) {
        await pubsub.publish(THEMES_UPDATED, {
          themesSubscription: await db.query.themes.findMany(),
        });
      }

      return result;
    },
  };
}

const schema = new GraphQLSchema({
  subscription: new GraphQLObjectType({
    name: "Subscription",
    fields: {
      pubsSubscription: {
        type: new GraphQLList(new GraphQLNonNull(entities.types.PubsItem)),
        subscribe: () => pubsub.asyncIterator([PUBS_UPDATED]),
        resolve: async (payload) => {
          return payload.pubsSubscription;
        },
      },
      themesSubscription: {
        type: new GraphQLList(new GraphQLNonNull(entities.types.ThemesItem)),
        subscribe: () => pubsub.asyncIterator([THEMES_UPDATED]),
        resolve: async (payload) => {
          return payload.themesSubscription;
        },
      },
    },
  }),
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...entities.queries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...wrappedMutations,
      regeneratePubKeys: {
        type: new GraphQLList(new GraphQLNonNull(entities.types.PubsItem)),
        args: {
          input: {
            type: new GraphQLNonNull(
              new GraphQLList(
                new GraphQLNonNull(
                  new GraphQLInputObjectType({
                    name: "RegeneratePubKeysInput",
                    fields: {
                      where: {
                        type: new GraphQLNonNull(
                          new GraphQLInputObjectType({
                            name: "RegeneratePubKeysWhere",
                            fields: {
                              pubId: {
                                type: new GraphQLNonNull(GraphQLString),
                              },
                            },
                          }),
                        ),
                      },
                      value: {
                        type: new GraphQLNonNull(
                          new GraphQLInputObjectType({
                            name: "RegeneratePubKeysValue",
                            fields: {
                              pubKey: {
                                type: new GraphQLNonNull(GraphQLString),
                              },
                            },
                          }),
                        ),
                      },
                    },
                  }),
                ),
              ),
            ),
          },
        },
        resolve: async (_, args) => {
          const results = [];
          for (const item of args.input) {
            const { pubId } = item.where;
            const { pubKey } = item.value;
            const result = await db
              .update(dbSchema.pubs)
              .set({ pubKey })
              .where(eq(dbSchema.pubs.pubId, pubId))
              .returning();
            results.push(result[0]);
          }
          await pubsub.publish(PUBS_UPDATED, {
            pubsSubscription: results,
          });
          return results;
        },
      },
      incrementPubOccupancy: {
        type: new GraphQLList(new GraphQLNonNull(entities.types.PubsItem)),
        args: {
          values: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "IncrementPubOccupancyValues",
                fields: {
                  increment: { type: new GraphQLNonNull(GraphQLInt) },
                },
              }),
            ),
          },
          where: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "IncrementPubOccupancyWhere",
                fields: {
                  pubId: { type: new GraphQLNonNull(GraphQLString) },
                },
              }),
            ),
          },
        },
        resolve: async (_, args) => {
          const { pubId } = args.where;
          const value = args.values.increment;
          const returning = await db
            .update(dbSchema.pubs)
            .set({ occupancy: increment(dbSchema.pubs.occupancy, value) })
            .where(eq(dbSchema.pubs.pubId, pubId))
            .returning();
          await pubsub.publish(PUBS_UPDATED, {
            pubsSubscription: await db.query.pubs.findMany(),
          });
          return returning;
        },
      },
      decrementPubOccupancy: {
        type: new GraphQLList(new GraphQLNonNull(entities.types.PubsItem)),
        args: {
          values: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "DecrementPubOccupancyValues",
                fields: {
                  decrement: { type: new GraphQLNonNull(GraphQLInt) },
                },
              }),
            ),
          },
          where: {
            type: new GraphQLNonNull(
              new GraphQLInputObjectType({
                name: "DecrementPubOccupancyWhere",
                fields: {
                  pubId: { type: new GraphQLNonNull(GraphQLString) },
                },
              }),
            ),
          },
        },
        resolve: async (_, args) => {
          const { pubId } = args.where;
          const { decrement } = args.values;
          const returning = await db
            .update(dbSchema.pubs)
            .set({ occupancy: increment(dbSchema.pubs.occupancy, -decrement) })
            .where(eq(dbSchema.pubs.pubId, pubId))
            .returning();
          await pubsub.publish(PUBS_UPDATED, {
            pubsSubscription: await db.query.pubs.findMany(),
          });
          return returning;
        },
      },
    },
  }),
});

const app = express();
const httpServer = createServer(app);

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await apolloServer.start();

// @ts-expect-error This type error seems incorrect ¯\_(ツ)_/¯
app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(apolloServer));

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});

useServer({ schema }, wsServer);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/subscriptions`);
});
