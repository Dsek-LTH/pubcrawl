import { z } from 'zod';
import { pubIdSchema } from '$lib/schemas/pubSchema';

export const pubKeySchema = z
	.string({ required_error: 'Pub key is required' })
	.trim()
	.min(5, { message: 'Invalid format' })
	.max(5, { message: 'Invalid format' })
	.toUpperCase(); // Maybe not check this for further security?

export const pubKeyIdPairSchema = z.object({
	oldPubKey: pubKeySchema.optional(),
	pubKey: pubKeySchema,
	pubId: pubIdSchema
});
