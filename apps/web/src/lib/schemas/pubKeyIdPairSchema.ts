import { z } from 'zod';

export const pubKeySchema = z
	.string({ required_error: 'Pub key is required' })
	.trim()
	.min(5, { message: 'Invalid pub key' })
	.max(5, { message: 'Invalid pub key' })
	.toUpperCase(); // Maybe not check this for further security?
