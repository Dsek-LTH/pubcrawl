import { GetPubsDoc, type GetPubsQuery, RegeneratePubKeys } from '$lib/graphql/types';
import { createApolloServerClient } from '$lib/graphql/apollo-client.server';

export const generatePubKeyString = (length: number = 5) => {
	const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	return Array.from({ length }, () =>
		characters.charAt(Math.floor(Math.random() * characters.length))
	).join('');
};

export const randomizePubKeys = async () => {
	const apolloServerClient = createApolloServerClient();
	const result = await apolloServerClient.query<GetPubsQuery>({ query: GetPubsDoc });

	if (!result.data.pubs.length) return;

	const newPubKeys: string[] = [];

	return await RegeneratePubKeys({
		variables: {
			input: result.data.pubs.map(({ pubId }) => {
				const existingPubKeys = result.data.pubs.map(({ pubKey }) => pubKey);
				let newPubKey;

				do newPubKey = generatePubKeyString();
				while (existingPubKeys.includes(newPubKey) || newPubKeys.includes(newPubKey));

				newPubKeys.push(newPubKey);

				return { where: { pubId }, value: { pubKey: newPubKey } };
			})
		}
	});
};
