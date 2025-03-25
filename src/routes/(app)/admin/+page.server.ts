import { setPub, setTheme, setPubKeyIdPair } from "$lib/server/db.ts";
import { QueueStatus } from "$lib/types.ts";

export const actions = {
  addTheme: async ({ request }) => {
    const data = await request.formData();
    const themeId = data.get("themeId");
    const displayName = data.get("displayName");
    await setTheme(themeId, { displayName, logo: "", color: "" });
  },
  addPub: async ({ request }) => {
    const data = await request.formData();
    const pubKey = data.get("pubKey");
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
};
