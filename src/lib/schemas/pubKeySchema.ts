import { z } from "zod";
import { pubIdSchema } from "$lib/schemas/pubSchema.ts";

export const pubKeySchema = z.string({ required_error: "Pub key is required" })
  .trim()
  .min(5, { message: "Invalid format" })
  .max(5, { message: "Invalid format" })
  .toUpperCase();

export const pubKeyIdPairSchema = z.object({
  pubKey: pubKeySchema,
  oldPubKey: pubKeySchema,
  pubId: pubIdSchema,
});
