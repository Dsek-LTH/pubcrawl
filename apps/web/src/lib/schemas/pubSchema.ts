import { z } from 'zod';
import { pubKeySchema } from './pubKeyIdPairSchema';

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
	pubKey: pubKeySchema,
	queueStatus: z.coerce.number().int(),
	logo: z.string({ required_error: 'Logo is required' }),
	displayName: z
		.string({ required_error: 'Display name is required' })
		.trim()
		.min(1, { message: 'Display name is required' }),
	color: z
		.string({ required_error: 'Color is required' })
		.trim()
		.min(1, { message: 'Color is required' })
		.toUpperCase()
		.regex(new RegExp('^#[0-9A-F]{6}[0-9A-F]{0,2}$'), {
			message: 'Must be a valid hex format.'
		}), // Maybe drop alpha support?
	isOpen: z.coerce.boolean().default(false)
});
