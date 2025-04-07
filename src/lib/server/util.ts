import { type Pub, type PubId, type PubKeys, type Pubs } from "$lib/types.ts";
import { getPubs, setPubKeyIdPairs } from "$lib/server/db.ts";

export function generatePubKeyString(length: number = 5): string {
  const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  return Array.from({ length }, () => 
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
}

export async function randomizePubKeys(): Promise<void> {
  const newPubKeyIdPairs: PubKeys = new Map() as PubKeys;
  const pubs: Pubs = await getPubs();

  pubs.forEach((_: Pub, pubId: PubId): void => {
    let newPubKey: string;

    do {
      newPubKey = generatePubKeyString();
    } while (newPubKeyIdPairs.has(newPubKey));

    newPubKeyIdPairs.set(newPubKey, pubId);
  });

  await setPubKeyIdPairs(newPubKeyIdPairs);
}
