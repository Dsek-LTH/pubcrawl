import { setPub } from "$lib/server/db.ts";

export const load = async () => {
  await setPub(
    "idet",
    {
      occupancy: 0,
      capacity: 150,
      intending: {},
      isActive: true,
      themeKey: "idet",
    },
  );
};
