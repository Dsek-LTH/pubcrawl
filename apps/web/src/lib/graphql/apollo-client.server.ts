import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { HttpLink } from '@apollo/client/link/http';
import { split } from '@apollo/client/link/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient } from '@apollo/client/core';
import { apolloClientCache } from '$lib/graphql/apollo-client';

const httpLink = new HttpLink({
	uri: publicEnv.PUBLIC_GRAPHQL_URL
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: env.GRAPHQL_SUBSCRIPTIONS_URL
	})
);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);

		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink
);

export const createApolloServerClient = () =>
	new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: splitLink,
		cache: apolloClientCache()
	});
