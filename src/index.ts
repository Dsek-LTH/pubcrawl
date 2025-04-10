import 'dotenv/config';
import {buildSchema} from 'drizzle-graphql';
import {drizzle} from 'drizzle-orm/node-postgres';
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

import * as dbSchema from './db/schema';
import {pubKeys} from './db/schema';

import pg from 'pg'
import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql/type";
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
                                            where: {
                                                type: new GraphQLNonNull(
                                                    new GraphQLInputObjectType({
                                                        name: 'RegeneratePubKeysWhere',
                                                        fields: {
                                                            id: { type: new GraphQLNonNull(GraphQLInt) },
                                                        },
                                                    })
                                                ),
                                            },
                                            value: {
                                                type: new GraphQLNonNull(
                                                    new GraphQLInputObjectType({
                                                        name: 'RegeneratePubKeysValue',
                                                        fields: {
                                                            pubKey: { type: new GraphQLNonNull(GraphQLString) },
                                                        },
                                                    })
                                                ),
                                            },
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
                        const { id } = item.where;
                        const { pubKey } = item.value;
                        const result = await db
                            .update(pubKeys)
                            .set({ key: pubKey })
                            .where(eq(pubKeys.id, id))
                            .returning();
                        results.push(result[0]);
                    }
                    return results;
                }
            },
            incrementPubOccupancy: {
                type: new GraphQLList(new GraphQLNonNull(entities.types.PubsItem)),
                args: {
                    values: {
                        type: new GraphQLNonNull(
                            new GraphQLInputObjectType({
                                name: 'IncrementPubOccupancyValues',
                                fields: {
                                    increment: { type: new GraphQLNonNull(GraphQLInt) }
                                }
                            })
                        )
                    },
                    where: {
                        type: new GraphQLNonNull(
                            new GraphQLInputObjectType({
                                name: 'IncrementPubOccupancyWhere',
                                fields: {
                                    pubId: { type: new GraphQLNonNull(GraphQLString) },
                                }
                            })
                        )
                    }
                },
                resolve: async (source, args, context, info) => {
                    const { pubId } = args.where;
                    const { increment } = args.values;
                    return db
                        .update(dbSchema.pubs)
                        .set({occupancy: (await db.query.pubs.findFirst({where: eq(dbSchema.pubs.pubId, pubId)})).occupancy + increment})
                        .where(eq(dbSchema.pubs.pubId, pubId))
                        .returning();
                }
            },
            decrementPubOccupancy: {
                type: new GraphQLList(new GraphQLNonNull(entities.types.PubsItem)),
                args: {
                    values: {
                        type: new GraphQLNonNull(
                            new GraphQLInputObjectType({
                                name: 'DecrementPubOccupancyValues',
                                fields: {
                                    decrement: { type: new GraphQLNonNull(GraphQLInt) }
                                }
                            })
                        )
                    },
                    where: {
                        type: new GraphQLNonNull(
                            new GraphQLInputObjectType({
                                name: 'DecrementPubOccupancyWhere',
                                fields: {
                                    pubId: { type: new GraphQLNonNull(GraphQLString) },
                                }
                            })
                        )
                    }
                },
                resolve: async (source, args, context, info) => {
                    const { pubId } = args.where;
                    const { decrement } = args.values;
                    return db
                        .update(dbSchema.pubs)
                        .set({occupancy: Math.max((await db.query.pubs.findFirst({where: eq(dbSchema.pubs.pubId, pubId)})).occupancy - decrement, 0)})
                        .where(eq(dbSchema.pubs.pubId, pubId))
                        .returning();
                }
            }
        }
    })
})

const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
