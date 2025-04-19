import { z } from 'zod';
import { themeIdSchema } from '$lib/schemas/themeSchema';

export const pubIdSchema = z
	.string({ required_error: 'Pub id is required' })
	.trim()
	.min(1, { message: 'Pub id is required' })
	.toLowerCase();

export const pubSchema = z.object({
	oldPubId: pubIdSchema.optional(),
	pubId: pubIdSchema,
	occupancy: z.coerce.number({ required_error: 'Occupancy is required' }).int({
		message: 'Occupancy must be an integer'
	}),
	capacity: z.coerce
		.number({ required_error: 'Capacity is required' })
		.int({
			message: 'Capacity must be an integer'
		})
		.nonnegative({ message: 'Capacity must be non-negative' }),
	isActive: z.coerce.boolean({ required_error: 'Active status is required' }),
	themeId: themeIdSchema
});
