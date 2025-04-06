import { getPubs, kv } from "$lib/server/db.ts";
import { produce } from "sveltekit-sse";

export function POST() {
  return produce(async function start({ emit }) {
    for await (const _ of kv.watch([["Pubs"]])) {
      emit(
        "pubsUpdated",
        JSON.stringify(Object.fromEntries(await getPubs())),
      );
    }
  });
}
