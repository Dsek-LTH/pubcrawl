import { fail, redirect } from "@sveltejs/kit";
import {
  deletePubKeyIdPair,
  getPub,
  getPubKeyIdPairId,
  getPubKeyIdPairs,
  getTheme,
  setPub,
  setPubOccupancy,
  updatePubOccupancy,
} from "$lib/server/db.ts";
import {
  type PubId,
  type PubKey,
  type PubKeyIdPairs,
  QueueStatus,
} from "$lib/types.ts";
import { Actions, PageServerLoad } from "./$types";
import { pubSchema } from "$lib/schemas/pubSchema.ts";

export const load: PageServerLoad = async ({ cookies }) => {
  const pubKey = cookies.get("pubKey");
  const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

  if (!pubKey || !pubKeyIdPairs.has(pubKey)) {
    return redirect(302, "/login/counter");
  }

  return { pubId: await getPubKeyIdPairId(pubKey) };
};

export const actions: Actions = {
  increment: async ({ cookies }) => {
    const pubKey: PubKey = cookies.get("pubKey");
    const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

    if (!pubKey || !pubKeyIdPairs.has(pubKey)) {
      return fail(401, { message: "Unauthorized" });
    }

    await updatePubOccupancy(
      await getPubKeyIdPairId(pubKey),
      1,
    );
  },
  decrement: async ({ cookies }) => {
    const pubKey: PubKey = cookies.get("pubKey");
    const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

    if (!pubKey || !pubKeyIdPairs.has(pubKey)) {
      return fail(401, { message: "Unauthorized" });
    }

    await updatePubOccupancy(
      await getPubKeyIdPairId(pubKey),
      -1,
    );
  },
  reset: async ({ cookies }) => {
    const pubKey: PubKey = cookies.get("pubKey");
    const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

    if (!pubKey || !pubKeyIdPairs.has(pubKey)) {
      return fail(401, { message: "Unauthorized" });
    }

    await setPubOccupancy(
      await getPubKeyIdPairId(pubKey),
      0,
    );
  },
  updatePub: async ({ request, cookies }) => {
    const pubKey: PubKey = cookies.get("pubKey");
    const pubKeyIdPairs: PubKeyIdPairs = await getPubKeyIdPairs();

    if (!pubKey || !pubKeyIdPairs.has(pubKey)) {
      return fail(401, { message: "Unauthorized" });
    }

    const pubId: PubId = pubKeyIdPairs.get(pubKey);

    const formData = Object.fromEntries(await request.formData());

    const result = pubSchema.pick({
      occupancy: true,
      capacity: true,
      isActive: true,
    })
      .safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    const pub = await getPub(pubId);
    await setPub(pubId, {
      occupancy: result.data.occupancy,
      capacity: result.data.capacity,
      intending: pub.intending,
      queueStatus: pub.queueStatus,
      isActive: result.data.isActive,
      themeId: pub.themeId,
    });
  },
  logout: async ({ cookies }) => {
    cookies.delete("pubKey", { path: "/" });
  },
} satisfies Actions;
