import 'dotenv/config';
import { buildSchema } from 'drizzle-graphql';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import * as dbSchema from './db/schema';

import pg from 'pg'
import {
    GraphQLInputObjectType, GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql/type";
import {pubKeys} from "./db/schema";
import {eq} from "drizzle-orm";
// import {emptyDBTables} from "./tmp";
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const db = drizzle({ client: pool, schema: dbSchema });

// await emptyDBTables(db)

// const { schema } = buildSchema(db);
//
// const server = new ApolloServer({ schema });
// const { url } = await startStandaloneServer(server);
//
// console.log(`🚀 Server ready at ${url}`);

const { entities } = buildSchema(db)
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            ...entities.queries
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            ...entities.mutations,
            regeneratePubKeys: {
                type: new GraphQLList(new GraphQLNonNull(entities.types.PubKeysItem)),
                args: {
                    input: {
                        type: new GraphQLNonNull(
                            new GraphQLList(
                                new GraphQLNonNull(
                                    new GraphQLInputObjectType({
                                        name: 'RegeneratePubKeysInput',
                                        fields: {
                                            id: { type: new GraphQLNonNull(GraphQLInt) },
                                            pubKey: { type: new GraphQLNonNull(GraphQLString) },
                                        }
                                    })
                                )
                            )
                        )
                    }
                },
                resolve: async (source, args, context, info) => {
                    const results = [];
                    for (const item of args.input) {
                        const { id, pubKey } = item;
                        const result = await db
                            .update(pubKeys)
                            .set({ key: pubKey })
                            .where(eq(pubKeys.id, id))
                            .returning();
                        results.push(result[0]);
                    }
                    return results;
                }
            }
        }
    })
})

const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
