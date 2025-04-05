import {
  setPub,
  setPubKeyIdPair,
  setTheme,
  updatePubKey,
} from "$lib/server/db.ts";
import { ADMIN_KEY } from "$env/static/private";
import { randomizePubKeys } from "$lib/server/util.ts";
import { QueueStatus } from "$lib/types.ts";
import { type Actions, type PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { themeSchema } from "$lib/schemas/themeSchema.ts";
import { pubSchema } from "$lib/schemas/pubSchema.ts";
import { pubKeyIdPairSchema } from "$lib/schemas/pubKeySchema.ts";

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get("adminKey") !== ADMIN_KEY) {
    return redirect(302, "/login/admin");
  }
};

export const actions: Actions = {
  createPubKey: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const data = Object.fromEntries(await request.formData());
  },
  updatePubKey: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const data = Object.fromEntries(await request.formData());

    const result = pubSchema.safeParse(pubKeyIdPairSchema);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    const oldPubKey = data.get("oldPubKey").toUpperCase();
    const newPubKey = data.get("newPubKey").toUpperCase();

    await updatePubKey(oldPubKey, newPubKey);
  },
  deletePubKey: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
  },
  randomizePubKeys: async () => {
    await randomizePubKeys();
  },
  createPub: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    const pubKey = data.get("pubKey").toUpperCase();
    const pubId = data.get("pubId");
    const themeId = data.get("themeId");
    await setPub(pubId, {
      occupancy: 0,
      capacity: 150,
      intending: new Map(),
      queueStatus: QueueStatus.EMPTY,
      isActive: true,
      themeId,
    });

    await setPubKeyIdPair(pubKey, pubId);
  },
  updatePub: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = pubSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    await setPub(result.data.pubId, {
      occupancy: result.data.occupancy,
      capacity: result.data.capacity,
      intending: new Map<string, Date>(),
      queueStatus: QueueStatus.EMPTY,
      isActive: result.data.isActive,
      themeId: result.data.themeId,
    });
  },
  deletePub: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
  },
  createTheme: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    const themeId = data.get("themeId");
    const displayName = data.get("displayName");
    await setTheme(themeId, { displayName, logo: "", color: "" });
  },
  updateTheme: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    const result = themeSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    await setTheme(result.data.themeId, {
      displayName: result.data.displayName,
      logo: result.data.logo,
      color: result.data.color,
    });
  },
  deleteTheme: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
  },
};
