import {
  deletePub,
  deletePubKeyIdPair,
  deleteTheme,
  setPub,
  setPubKeyIdPair,
  setTheme,
} from "$lib/server/db.ts";
import { ADMIN_KEY } from "$env/static/private";
import { generatePubKeyString, randomizePubKeys } from "$lib/server/util.ts";
import { QueueStatus } from "$lib/types.ts";
import { type Actions, type PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { themeIdSchema, themeSchema } from "$lib/schemas/themeSchema.ts";
import { pubSchema } from "$lib/schemas/pubSchema.ts";
import { pubKeyIdPairSchema } from "$lib/schemas/pubKeyIdPairSchema.ts";

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get("adminKey") !== ADMIN_KEY) {
    return redirect(302, "/login/admin");
  }
};

export const actions: Actions = {
  createPubKeyIdPair: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = pubKeyIdPairSchema.pick({
      pubKey: true,
      pubId: true,
    })
      .safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }
    console.log(result.data.pubId);
    await setPubKeyIdPair(
      result.data.pubKey,
      result.data.pubId,
    );
  },
  updatePubKeyIdPair: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = pubKeyIdPairSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    // Maybe want to make this atomic
    await deletePubKeyIdPair(result.data.oldPubKey);
    await setPubKeyIdPair(result.data.pubKey, result.data.pubId);
  },
  deletePubKeyIdPair: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = pubKeyIdPairSchema.pick({
      pubKey: true,
    })
      .safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    await deletePubKeyIdPair(result.data.pubKey);
  },
  randomizePubKeyIdPairPubKeys: async () => {
    await randomizePubKeys();
  },
  createPub: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = pubSchema.pick({
      pubId: true,
      occupancy: true,
      capacity: true,
      themeId: true,
    })
      .safeParse(formData);

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
      isActive: true,
      themeId: result.data.themeId,
    });
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

    // Maybe want to make this atomic
    await deletePub(result.data.oldPubId);
    await setPub(result.data.pubId, {
      occupancy: result.data.occupancy,
      capacity: result.data.capacity,
      intending: new Map<string, Date>(),
      queueStatus: QueueStatus.EMPTY,
      isActive: result.data.isActive,
      themeId: result.data.themeId,
    });
  },
  deletePub: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = pubSchema.pick({
      pubId: true,
    })
      .safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    await deletePub(result.data.pubId);
  },
  createTheme: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

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
  updateTheme: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = themeSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    await deleteTheme(result.data.oldThemeId);
    await setTheme(result.data.themeId, {
      displayName: result.data.displayName,
      logo: result.data.logo,
      color: result.data.color,
    });
  },
  deleteTheme: async ({ request, cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    const formData = Object.fromEntries(await request.formData());

    const result = themeSchema.pick({
      themeId: true,
    })
      .safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
        values: result.data,
      });
    }

    await deleteTheme(result.data.themeId);
  },
  logout: async ({ cookies }) => {
    if (cookies.get("adminKey") !== ADMIN_KEY) {
      return fail(401, { message: "Unauthorized" });
    }

    cookies.delete("adminKey", { path: "/" });
  },
};
