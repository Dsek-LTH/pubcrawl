import { kv,  getActivePubs } from "$lib/server/db.ts"
import { produce } from "sveltekit-sse";

export function POST() {
  return produce(async function start ({ emit }) {
    const watcher = kv.watch([["pubs"]]);
    for await (const change of watcher) {
      console.log(change);
      emit("pub_update_count", JSON.stringify(await getActivePubs()))  
    }
    console.log("SHOULD NEVER GET HERE");
  });
}

