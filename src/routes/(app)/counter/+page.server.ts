import { type Cookies, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { pubSchema } from '$lib/schemas/pubSchema';
import {
	DecrementPubOccupancy,
	type GetPubKeysQuery,
	IncrementPubOccupancy,
	UpdatePub
} from '$lib/graphql/types';
import { getPubKeys } from '$lib/graphql/queries/get-pub-keys';
import { createApolloServerClient } from '$lib/graphql/apollo-client.server';

const getPubKeyAndId = async (cookies: Cookies) => {
	const pubKey = cookies.get('pubKey');
	const apolloServerClient = createApolloServerClient();
	const { pubKeys } = (await apolloServerClient.query<GetPubKeysQuery>({ query: getPubKeys })).data;
	const pubId = pubKeys.find((key) => key.key === pubKey)?.pubId;

	if (!pubKey || !pubId) {
		return null;
	}

	return { pubKey, pubId };
};

const unauthorized = () => {
	return fail(401, { message: 'Unauthorized' });
};

export const load: PageServerLoad = async ({ cookies }) => {
	const result = await getPubKeyAndId(cookies);
	if (!result) return redirect(302, '/login/counter');

	return { pubId: result.pubId };
};

export const actions: Actions = {
	increment: async ({ cookies }) => {
		const result = await getPubKeyAndId(cookies);
		if (!result) return unauthorized();
		const { pubId } = result;

		await IncrementPubOccupancy({ variables: { pubId: pubId, increment: 1 } });
	},
	decrement: async ({ cookies }) => {
		const result = await getPubKeyAndId(cookies);
		if (!result) return unauthorized();
		const { pubId } = result;

		await DecrementPubOccupancy({ variables: { pubId: pubId, decrement: 1 } });
	},
	reset: async ({ cookies }) => {
		const result = await getPubKeyAndId(cookies);
		if (!result) return unauthorized();
		const { pubId } = result;

		await UpdatePub({ variables: { oldPubId: pubId, pub: { occupancy: 0 } } });
	},
	updatePub: async ({ request, cookies }) => {
		const pubKeyAndIdResult = await getPubKeyAndId(cookies);
		if (!pubKeyAndIdResult) return unauthorized();
		const { pubId } = pubKeyAndIdResult;

		const formData = Object.fromEntries(await request.formData());

		const result = pubSchema
			.pick({
				occupancy: true
			})
			.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors,
				values: result.data
			});
		}

		await UpdatePub({ variables: { oldPubId: pubId, pub: { occupancy: result.data.occupancy } } });
	},
	logout: async ({ cookies }) => {
		if (!(await getPubKeyAndId(cookies))) return unauthorized();

		cookies.delete('pubKey', { path: '/' });
	}
} satisfies Actions;
