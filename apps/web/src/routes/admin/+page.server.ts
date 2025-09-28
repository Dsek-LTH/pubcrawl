import { env } from '$env/dynamic/private';
import { generatePubKeyString, randomizePubKeys } from '$lib/server/utils';
import { QueueStatus } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { pubSchema } from '$lib/schemas/pubSchema';
import { CreatePub, RemovePub, UpdatePub } from '$lib/graphql/types';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('adminKey') !== env.ADMIN_KEY) {
		return redirect(302, '/login/admin');
	}
};

export const actions: Actions = {
	randomizePubKeyIdPairPubKeys: async () => {
		await randomizePubKeys();
	},
	createPub: async ({ request, cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());

		const result = pubSchema
			.pick({
				pubId: true,
				capacity: true,
				displayName: true,
				logo: true,
				color: true
			})
			.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors,
				values: result.data
			});
		}

		await CreatePub({
			variables: {
				pubId: result.data.pubId,
				pubKey: generatePubKeyString(),
				occupancy: 0,
				capacity: result.data.capacity,
				queueStatus: QueueStatus.EMPTY,
				isActive: true,
				displayName: result.data.displayName,
				logo: result.data.logo,
				color: result.data.color
			}
		});
	},
	updatePub: async ({ request, cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());

		const result = pubSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors,
				values: result.data
			});
		}

		if (!result.data.oldPubId) return fail(400, { message: 'No pub to update' });

		await UpdatePub({
			variables: {
				oldPubId: result.data.oldPubId,
				pub: {
					pubId: result.data.pubId,
					occupancy: result.data.occupancy,
					capacity: result.data.capacity,
					queueStatus: result.data.queueStatus,
					isActive: result.data.isActive,
					pubKey: result.data.pubKey,
					displayName: result.data.displayName,
					logo: result.data.logo,
					color: result.data.color
				}
			}
		});
	},
	deletePub: async ({ request, cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());

		const result = pubSchema
			.pick({
				pubId: true
			})
			.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors,
				values: result.data
			});
		}

		await RemovePub({ variables: { pubId: result.data.pubId } });
	},
	logout: async ({ cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		cookies.delete('adminKey', { path: '/' });
	}
};
