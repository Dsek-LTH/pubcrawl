import { counterLoginSchema } from "$lib/schemas/counterLoginSchema.ts";
import { fail, redirect } from "@sveltejs/kit";
import { type Actions, type PageServerLoad } from "./$types";
import { getPubKeyIdPairs } from "$lib/server/db.ts";
import { type PubKeys } from "$lib/types.ts";

export const load: PageServerLoad = async ({ cookies }) => {
  const pubKey = cookies.get("pubKey");

  const pubKeyIdPairs: PubKeys = await getPubKeyIdPairs();

  if (pubKeyIdPairs.has(pubKey)) {
    return redirect(303, "/counter");
  }
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData());

    const result = counterLoginSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
      });
    }

    const pubKey: string = result.data.pubKey;
    const pubKeyIdPairs: PubKeys = await getPubKeyIdPairs();

    if (!pubKeyIdPairs.has(pubKey)) {
      return fail(401, {
        errors: {
          general: ["Invalid pub key"],
        },
      });
    }

    cookies.set("pubKey", pubKey, { path: "/" });

    throw redirect(303, "/counter");
  },
};
