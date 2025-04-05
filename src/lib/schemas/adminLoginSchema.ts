import { z } from "zod";

export const adminLoginSchema = z.object({
  adminKey: z.string({ required_error: "Admin key is required" })
    .trim()
    .min(1, { message: "Admin key is required" }),
});

export type AdminLoginForm = z.infer<typeof adminLoginSchema>;
