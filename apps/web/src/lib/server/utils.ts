import { GetPubKeysDoc, type GetPubKeysQuery, RegeneratePubKeys } from '$lib/graphql/types';
import { createApolloServerClient } from '$lib/graphql/apollo-client.server';

export const generatePubKeyString = (length: number = 5) => {
	const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	return Array.from({ length }, () =>
		characters.charAt(Math.floor(Math.random() * characters.length))
	).join('');
};

export const randomizePubKeys = async () => {
	const apolloServerClient = createApolloServerClient();
	const result = await apolloServerClient.query<GetPubKeysQuery>({ query: GetPubKeysDoc });

	if (!result.data.pubKeys.length) return;

	return await RegeneratePubKeys({
		variables: {
			input: result.data.pubKeys.map((pubKey) => {
				return { where: { id: pubKey.id }, value: { pubKey: generatePubKeyString() } };
			})
		}
	});
};
