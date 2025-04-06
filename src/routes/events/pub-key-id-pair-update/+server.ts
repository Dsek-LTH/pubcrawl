import { produce } from "sveltekit-sse";
import { ADMIN_KEY } from "$env/static/private";
import { getPubKeyIdPairs, kv } from "$lib/server/db.ts";

export async function POST({ cookies }) {
  if (cookies.get("adminKey") !== ADMIN_KEY) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return produce(async function start({ emit }) {
    for await (const _ of kv.watch([["PubKeyIdPairs"]])) {
      emit(
        "pubKeyIdPairsUpdated",
        JSON.stringify(Object.fromEntries(await getPubKeyIdPairs())),
      );
    }
  });
}
