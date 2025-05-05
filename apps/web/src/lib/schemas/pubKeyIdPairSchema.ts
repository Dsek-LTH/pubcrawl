import { z } from 'zod';

export const pubKeySchema = z
	.string({ required_error: 'Pub key is required' })
	.trim()
	.min(5, { message: 'Invalid format' })
	.max(5, { message: 'Invalid format' })
	.toUpperCase(); // Maybe not check this for further security?
