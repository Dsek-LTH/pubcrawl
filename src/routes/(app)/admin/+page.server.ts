import { updatePubOccupancy, getPubId } from "$lib/server/db.ts";

export const actions = {
  default: async (event) => {
    console.log("AHHAHA");
    await updatePubOccupancy("idet", 1);
  },
};
