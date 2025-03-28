import { Pub, PubKey, QueueStatus, Theme, ThemeKey } from "$lib/types.ts";

const kv = await Deno.openKv();

export async function setTheme(
  themeKey: ThemeKey,
  theme: Theme,
): Promise<void> {
  await kv.set(["themes", themeKey], theme);
}

export async function getTheme(themeKey: ThemeKey): Promise<Theme> {
  const res = await kv.get(["themes", themeKey]);

  if (res.versionstamp === null) {
    throw new Error(`Theme with themeKey "${themeKey}" not found`);
  }

  return res.value as Theme;
}

export async function setPub(pubKey: PubKey, pub: Pub): Promise<void> {
  await kv.set(["pubs", pubKey], pub);
}

export async function getPub(pubKey: PubKey): Promise<Pub> {
  const res = await kv.get(["pubs", pubKey]);

  if (res.versionstamp === null) {
    throw new Error(`Pub with pubKey "${pubKey}" not found`);
  }

  return res.value as Pub;
}

export async function updatePubKey(
  oldPubKey: PubKey,
  newPubKey: PubKey,
): Promise<void> {
  const pub: Pub = await getPub(oldPubKey);

  // Atomic to avoid race conditions
  await kv.atomic()
    .delete(["pubs", oldPubKey])
    .set(["pubs", newPubKey], pub)
    .commit();
}

export async function getActivePubs(): Promise<Pub[]> {
  const iter = kv.list({ prefix: ["pubs"] });

  const activePubs: Pub[] = [];

  for await (const entry of iter) {
    const pub = entry.value as Pub;

    if (pub.isActive) {
      activePubs.push(pub);
    }
  }

  return activePubs;
}

export async function setPubOccupancy(
  pubKey: PubKey,
  occupancy: number,
): Promise<void> {
  const pub: Pub = await getPub(pubKey);

  if (occupancy < 0) {
    throw new Error(`occupancy (${occupancy}) must be non-negative`);
  }

  if (occupancy > pub.capacity) {
    throw new Error(
      `occupancy (${occupancy}) cannot exceed capacity (${pub.capacity})`,
    );
  }

  pub.occupancy = occupancy;

  await setPub(pubKey, pub);
}

export async function updatePubOccupancy(
  pubKey: PubKey,
  delta: number,
): Promise<void> {
  const pub: Pub = await getPub(pubKey);
  const newOccupancy = pub.occupancy + delta;

  await setPubOccupancy(pubKey, newOccupancy);
}

export async function setPubCapacity(
  pubKey: PubKey,
  capacity: number,
): Promise<void> {
  if (capacity < 0) {
    throw new Error(`capacity (${capacity}) must be non-negative`);
  }

  const pub: Pub = await getPub(pubKey);

  if (capacity < pub.occupancy) {
    throw new Error(
      `capacity (${capacity}) must be greater than or equal to occupancy (${pub.occupancy}))`,
    );
  }

  pub.capacity = capacity;

  await setPub(pubKey, pub);
}

export async function setPubQueueStatus(
  pubKey: PubKey,
  queueStatus: QueueStatus,
): Promise<void> {
  const pub: Pub = await getPub(pubKey);
  pub.queueStatus = queueStatus;

  await setPub(pubKey, pub);
}

export async function setPubTheme(
  pubKey: PubKey,
  themeKey: ThemeKey,
): Promise<void> {
  const pub: Pub = await getPub(pubKey);
  pub.themeKey = themeKey;

  await setPub(pubKey, pub);
}
