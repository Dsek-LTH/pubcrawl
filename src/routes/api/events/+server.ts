import { produce, type Unsafe } from 'sveltekit-sse';
import { createApolloServerClient } from '$lib/graphql/apollo-client.server';
import {
	GetPubKeysDoc,
	type GetPubKeysQuery,
	GetPubsDoc,
	type GetPubsQuery,
	GetThemesDoc,
	type GetThemesQuery,
	PubKeysSubscriptionDoc,
	type PubKeysSubscriptionSubscription,
	PubsSubscriptionDoc,
	type PubsSubscriptionSubscription,
	ThemesSubscriptionDoc,
	type ThemesSubscriptionSubscription
} from '$lib/graphql/types';
import { EVENTS } from '$lib/api';
import type { ApolloClient, DocumentNode, NormalizedCacheObject } from '@apollo/client/core';
import { env } from '$env/dynamic/private';

export const POST = async ({ cookies }) => {
	const apolloServerClient = createApolloServerClient();

	return produce(async function start({ emit }) {
		const isAdmin = cookies.get('adminKey') === env.ADMIN_KEY;

		const adminPromises = isAdmin
			? [
					queryAndEmit<GetPubKeysQuery>(
						apolloServerClient,
						GetPubKeysDoc,
						EVENTS.pubKeysUpdated,
						emit,
						'pubKeys'
					),
					createSubscription<PubKeysSubscriptionSubscription>(
						apolloServerClient,
						PubKeysSubscriptionDoc,
						EVENTS.pubKeysUpdated,
						emit,
						'pubKeysSubscription'
					)
				]
			: [];

		const subscriptions = await Promise.all([
			queryAndEmit<GetPubsQuery>(apolloServerClient, GetPubsDoc, EVENTS.pubsUpdated, emit, 'pubs'),
			createSubscription<PubsSubscriptionSubscription>(
				apolloServerClient,
				PubsSubscriptionDoc,
				EVENTS.pubsUpdated,
				emit,
				'pubsSubscription'
			),
			queryAndEmit<GetThemesQuery>(
				apolloServerClient,
				GetThemesDoc,
				EVENTS.themesUpdated,
				emit,
				'themes'
			),
			createSubscription<ThemesSubscriptionSubscription>(
				apolloServerClient,
				ThemesSubscriptionDoc,
				EVENTS.themesUpdated,
				emit,
				'themesSubscription'
			),
			...adminPromises
		]);

		return () => {
			for (const subscription of subscriptions) {
				if (subscription) subscription.unsubscribe();
			}
		};
	});
};

const queryAndEmit = async <T>(
	apolloServerClient: ApolloClient<NormalizedCacheObject>,
	subscriptionDoc: DocumentNode,
	eventName: string,
	emit: (eventName: string, ata: string) => Unsafe<void>,
	dataKey: keyof T
) => {
	emit(
		eventName,
		JSON.stringify(
			(await apolloServerClient.query<T>({ query: subscriptionDoc, fetchPolicy: 'network-only' }))
				.data[dataKey]
		)
	);
};

const createSubscription = async <T>(
	apolloServerClient: ApolloClient<NormalizedCacheObject>,
	subscriptionDoc: DocumentNode,
	eventName: string,
	emit: (eventName: string, data: string) => Unsafe<void>,
	dataKey: keyof T
) => {
	return apolloServerClient
		.subscribe<T>({
			query: subscriptionDoc
		})
		.subscribe({
			next(result) {
				const data = result?.data?.[dataKey];
				if (data) emit(eventName, JSON.stringify(data));
			},
			error(err) {
				console.error(`Apollo subscription error for ${eventName}:`, err);
			}
		});
};
