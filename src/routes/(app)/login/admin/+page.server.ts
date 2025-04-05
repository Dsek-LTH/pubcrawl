import { ADMIN_KEY } from "$env/static/private";
import { adminLoginSchema } from "$lib/schemas/adminLoginSchema.ts";
import { fail, redirect } from "@sveltejs/kit";
import { type Actions, type PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const adminKey = cookies.get("adminKey");

  if (adminKey === ADMIN_KEY) {
    return redirect(303, "/admin");
  }
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData());

    const result = adminLoginSchema.safeParse(formData);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

      return fail(400, {
        errors: fieldErrors,
      });
    }

    const adminKey: string = result.data.adminKey;

    if (adminKey !== ADMIN_KEY) {
      return fail(401, {
        errors: {
          general: ["Invalid admin key"],
        },
      });
    }

    cookies.set("adminKey", adminKey, { path: "/" });

    throw redirect(303, "/admin");
  },
};
