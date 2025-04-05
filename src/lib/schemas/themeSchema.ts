import { z } from "zod";

export const themeIdSchema = z.string({
  required_error: "Theme id is required",
})
  .trim()
  .toLowerCase();

export const themeSchema = z.object({
  themeId: themeIdSchema,
  logo: z.string({ required_error: "Logo is required" }),
  displayName: z.string({ required_error: "Display name is required" })
    .trim()
    .min(0, { message: "Display name is required" }),
  color: z.string({ required_error: "Color is required" })
    .trim()
    .min(0, { message: "Color is required" })
    .toUpperCase()
    .regex(new RegExp("^#[0-9A-F]{6}[0-9A-F]{0,2}$"), {
      message: "Must be a valid hex format.",
    }), // Maybe drop alpha support?
});
