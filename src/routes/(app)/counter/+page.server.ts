import { fail, redirect } from "@sveltejs/kit";
import {
  getPub,
  getPubId,
  getPubKeys,
  getTheme,
  setPubOccupancy,
  updatePubOccupancy,
} from "$lib/server/db.ts";
import { type PubKeys } from "$lib/types.ts";
import { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const pubKey = cookies.get("pubKey");
  const pubKeys: PubKeys = await getPubKeys();

  if (!pubKey || !pubKeys.has(pubKey)) {
    return redirect(302, "/login/counter");
  }

  return { pubId: await getPubId(pubKey) };
};

export const actions: Actions = {
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
    const pubKey = cookies.get("pubKey");
    const pubId = await getPubId(pubKey);
    await updatePubOccupancy(pubId, -1);
  },
  reset: async ({ cookies }) => {
    const pubKey = cookies.get("pubKey");
    const pubId = await getPubId(pubKey);
    await setPubOccupancy(pubId, 0);
  },
  logout: async ({ cookies }) => {
    cookies.delete("pubKey", { path: "/" });
  },
} satisfies Actions;
