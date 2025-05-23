import { env } from '$env/dynamic/private';
import { generatePubKeyString, randomizePubKeys } from '$lib/server/utils';
import { QueueStatus } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { themeSchema } from '$lib/schemas/themeSchema';
import { pubSchema } from '$lib/schemas/pubSchema';
import {
	CreatePub,
	CreateTheme,
	RemovePub,
	RemoveTheme,
	UpdatePub,
	UpdateTheme
} from '$lib/graphql/types';

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
				themeId: true
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
				themeId: result.data.themeId
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
					queueStatus: QueueStatus.EMPTY,
					isActive: result.data.isActive,
					themeId: result.data.themeId,
					pubKey: result.data.pubKey
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
	createTheme: async ({ request, cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());

		const result = themeSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors,
				values: result.data
			});
		}

		await CreateTheme({
			variables: {
				themeId: result.data.themeId,
				displayName: result.data.displayName,
				logo: result.data.logo,
				color: result.data.color
			}
		});
	},
	updateTheme: async ({ request, cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());

		const result = themeSchema.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors,
				values: result.data
			});
		}

		if (!result.data.oldThemeId) return fail(400, { message: 'No theme to update' });

		await UpdateTheme({
			variables: {
				oldThemeId: result.data.oldThemeId,
				theme: {
					themeId: result.data.themeId,
					displayName: result.data.displayName,
					logo: result.data.logo,
					color: result.data.color
				}
			}
		});
	},
	deleteTheme: async ({ request, cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = Object.fromEntries(await request.formData());

		const result = themeSchema
			.pick({
				themeId: true
			})
			.safeParse(formData);

		if (!result.success) {
			const { fieldErrors } = result.error.flatten();

			return fail(400, {
				errors: fieldErrors,
				values: result.data
			});
		}

		await RemoveTheme({ variables: { themeId: result.data.themeId } });
	},
	logout: async ({ cookies }) => {
		if (cookies.get('adminKey') !== env.ADMIN_KEY) {
			return fail(401, { message: 'Unauthorized' });
		}

		cookies.delete('adminKey', { path: '/' });
	}
};
