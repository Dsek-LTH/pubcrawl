import { fail } from "@sveltejs/kit";
import {
  getPub,
  getPubId,
  getTheme,
  updatePubOccupancy,
} from "$lib/server/db.ts";

export const actions = {
  increment: async ({ cookies }) => {
    try {
      const pubKey = cookies.get("pubKey");
      const pubId = await getPubId(pubKey);
      await updatePubOccupancy(pubId, 1);
    } catch (error) {
      return fail(401, {
        description: "Invalid pubKey",
        error: error.message,
      });
    }
  },

  decrement: async ({ cookies }) => {
    try {
      const pubKey = cookies.get("pubKey");
      const pubId = await getPubId(pubKey);
      await updatePubOccupancy(pubId, -1);
    } catch (error) {
      return fail(401, {
        description: "Invalid pubKey",
        error: error.message,
      });
    }
  },

  verify: async ({ cookies, request }) => {
    try {
      const data = await request.formData();
      const pubKey = data.get("pubKey");

      // All these may fail
      const pubId = await getPubId(pubKey);
      const pub = await getPub(pubId);
      const theme = await getTheme(pub.themeId);

      // Maybe not want / for path?
      cookies.set("pubKey", pubKey, { path: "/" });
      cookies.set("theme", theme, { path: "/" });

      return { theme };
    } catch (error) {
      return fail(401, {
        description: "Invalid pubKey",
        error: error.message,
      });
    }
  },
};
