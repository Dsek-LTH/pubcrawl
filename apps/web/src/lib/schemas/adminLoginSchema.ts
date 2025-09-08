import { z } from 'zod';

export const adminLoginSchema = z.object({
	key: z
		.string({ required_error: 'Admin key is required' })
		.trim()
		.min(1, { message: 'Admin key is required' })
});
