import { countLoginSchema } from '$lib/schemas/countLoginSchema';
import { type Cookies, error, fail, redirect } from '@sveltejs/kit';
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
	const failNum: number = (cookies.get('limit') as unknown as number) ?? 0;

	if (failNum > 9) {
		error(429, { message: 'Too many requests' });
	}

	const result = await getPubKey(cookies);

	if (result) return redirect(303, '/count');

	return null;
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		const result = countLoginSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			let failNum: number = (cookies.get('limit') as unknown as number) ?? 0;
			failNum++;

			if (failNum > 10) {
				error(429, { message: 'Too many requests' });
			}

			const failString = failNum as unknown as string;
			cookies.set('limit', failString, { path: '/', maxAge: 10 * 60 });

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

		throw redirect(303, '/count');
	}
};
