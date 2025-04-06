import { z } from "zod";

import { pubKeySchema } from "./pubKeyIdPairSchema.ts";

export const counterLoginSchema = z.object({
  pubKey: pubKeySchema,
});
