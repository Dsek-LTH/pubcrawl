import { z } from "zod";

import { pubKeySchema } from "$lib/schemas/pubKeySchema.ts";

export const counterLoginSchema = z.object({
  pubKey: pubKeySchema,
});
