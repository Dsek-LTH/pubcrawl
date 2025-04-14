import { z } from 'zod';

import { pubKeySchema } from './pubKeyIdPairSchema';

export const counterLoginSchema = z.object({
	pubKey: pubKeySchema
});
