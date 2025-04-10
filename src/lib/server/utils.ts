import { type GetPubKeysQuery, RegeneratePubKeys } from '$lib/graphql/types';
import apolloClient from '$lib/graphql/apollo-client';
import { getPubKeys } from '$lib/graphql/queries/get-pub-keys';

export const generatePubKeyString = (length: number = 5) => {
	const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	return Array.from(
		{ length },
		() => characters.charAt(Math.floor(Math.random() * characters.length)),
	).join("");
}

export const randomizePubKeys = async () => {
	const result = await apolloClient.query<GetPubKeysQuery>({ query: getPubKeys });

	if (result.data.pubKeys.length !> 0) return
	
	return await RegeneratePubKeys({
		variables: {
			input: result.data.pubKeys.map((pubKey) => {
				return { where: { id: pubKey.id }, value: { pubKey: generatePubKeyString() } };
			})
		}
	});
}