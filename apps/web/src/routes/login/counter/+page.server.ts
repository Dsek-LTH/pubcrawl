import { counterLoginSchema } from '$lib/schemas/counterLoginSchema';
import { type Cookies, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { GetPubKeysDoc, type GetPubKeysQuery } from '$lib/graphql/types';
import { createApolloServerClient } from '$lib/graphql/apollo-client.server';

const getPubKey = async (cookies: Cookies) => {
	const pubKey = cookies.get('pubKey');

	if (!pubKey) return null;

	return (await validatePubKey(pubKey)) ? pubKey : null;
};

const validatePubKey = async (pubKey: string) => {
	const apolloServerClient = createApolloServerClient();
	const { pubs } = (await apolloServerClient.query<GetPubKeysQuery>({ query: GetPubKeysDoc })).data;

	return !!pubs.find((pub) => pub.pubKey === pubKey);
};

export const load: PageServerLoad = async ({ cookies }) => {
	const result = await getPubKey(cookies);

	if (result) return redirect(303, '/counter');

	return null;
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = counterLoginSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors
			});
		}

		const pubKey: string = result.data.pubKey;
		const pubKeyExists = validatePubKey(pubKey);

		if (!pubKeyExists) {
			return fail(401, {
				errors: {
					general: ['Invalid pub key']
				}
			});
		}

		cookies.set('pubKey', pubKey, {
			path: '/',
			httpOnly: true,
			maxAge: 48 * 60 * 60
		});

		throw redirect(303, '/counter');
	}
};
