import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { env } from '$env/dynamic/public';

export const apolloClient = new ApolloClient({
	uri: env.PUBLIC_GRAPHQL_URL,
	cache: new InMemoryCache(),
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
})

export default apolloClient;
