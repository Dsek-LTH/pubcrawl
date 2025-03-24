import { updatePubOccupancy } from "$lib/server/db.ts";

export const actions = {
  default: async (event) => {
    console.log("AHHAHA");
    updatePubOccupancy("XVA75", 1);
  },
};
