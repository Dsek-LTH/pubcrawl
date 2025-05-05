import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { env } from '$env/dynamic/public';

export const apolloClientCache = () =>
	new InMemoryCache({
		typePolicies: {
			Subscription: {
				fields: {
					pubKeysSubscription: {
						merge(existing = [], incoming) {
							return [...existing, ...incoming];
						}
					},
					pubsSubscription: {
						merge(existing = [], incoming) {
							return [...existing, ...incoming];
						}
					},
					themesSubscription: {
						merge(existing = [], incoming) {
							return [...existing, ...incoming];
						}
					}
				}
			}
		}
	});

export const apolloClient = new ApolloClient({
	uri: env.PUBLIC_GRAPHQL_URL,
	cache: apolloClientCache(),
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
});

export default apolloClient;
