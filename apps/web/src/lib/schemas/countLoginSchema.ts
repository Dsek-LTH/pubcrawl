import { z } from 'zod';

import { pubKeySchema } from './pubKeyIdPairSchema';

export const countLoginSchema = z.object({
	pubKey: pubKeySchema
});
