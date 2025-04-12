import "dotenv/config";
import { buildSchema } from "drizzle-graphql";
import { drizzle } from "drizzle-orm/node-postgres";
import { ApolloServer } from "@apollo/server";
// import {startStandaloneServer} from '@apollo/server/standalone';
import * as dbSchema from "./db/schema";
import { pubKeys } from "./db/schema";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { useServer } from "graphql-ws/use/ws";
import { increment } from "./utils";
import pg from "pg";
import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql/type";
import { eq } from "drizzle-orm";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool, schema: dbSchema });

import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
const PUB_KEYS_UPDATED = "PUB_KEYS_UPDATED";

const { entities } = buildSchema(db);
const originalMutations = entities.mutations;
const wrappedMutations = {};
for (const [key, resolver] of Object.entries(originalMutations)) {
  wrappedMutations[key] = {
    ...resolver,
    resolve: async (...args) => {
      const result = await resolver.resolve(...args);

      // TODO: Might want to do this in a smarter/more sophisticated way?
      const touchesPubKeys = key.toLowerCase().includes("pubkey");

      if (touchesPubKeys) {
        await pubsub.publish(PUB_KEYS_UPDATED, {});
      }

      return result;
    },
  };
}

const schema = new GraphQLSchema({
  subscription: new GraphQLObjectType({
    name: "Subscription",
    fields: {
      pubKeysSubscription: {
        type: new GraphQLList(new GraphQLNonNull(entities.types.PubKeysItem)),
        subscribe: () => pubsub.asyncIterableIterator([PUB_KEYS_UPDATED]),
        resolve: async () => {
          return db.query.pubKeys.findMany();
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
        type: new GraphQLList(new GraphQLNonNull(entities.types.PubKeysItem)),
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
                              id: { type: new GraphQLNonNull(GraphQLInt) },
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
        resolve: async (source, args, context, info) => {
          const results = [];
          for (const item of args.input) {
            const { id } = item.where;
            const { pubKey } = item.value;
            const result = await db
              .update(pubKeys)
              .set({ key: pubKey })
              .where(eq(pubKeys.id, id))
              .returning();
            results.push(result[0]);
          }
          await pubsub.publish(PUB_KEYS_UPDATED, {});
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
        resolve: async (source, args, context, info) => {
          const { pubId } = args.where;
          const value = args.values.increment;
          return db
            .update(dbSchema.pubs)
            .set({ occupancy: increment(dbSchema.pubs.occupancy, value) })
            .where(eq(dbSchema.pubs.pubId, pubId))
            .returning();
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
        resolve: async (source, args, context, info) => {
          const { pubId } = args.where;
          const { decrement } = args.values;
          return db
            .update(dbSchema.pubs)
            .set({ occupancy: increment(dbSchema.pubs.occupancy, -decrement) })
            .where(eq(dbSchema.pubs.pubId, pubId))
            .returning();
        },
      },
    },
  }),
});

// const server = new ApolloServer({ schema });
// const { url } = await startStandaloneServer(server);
//
// console.log(`🚀 Server ready at ${url}`);

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();

const app = express();
app.use(cors(), bodyParser.json(), expressMiddleware(apolloServer));

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer({ schema }, wsServer);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`),
);
