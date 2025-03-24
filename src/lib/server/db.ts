import {
  Pub,
  PubKey,
  Pubs,
  QueueStatus,
  Theme,
  ThemeKey,
  Themes,
} from "$lib/types.ts";

export const kv = await Deno.openKv("db.sqlite");

export async function getThemes(): Promise<Themes> {
  const res = await kv.get(["themes"]);

  if (res.versionstamp === null) {
    throw new Error(`There are no themes?!?!??!?!`);
  }

  return res.value as Themes;
}

export async function getTheme(themeKey: ThemeKey): Promise<Theme> {
  const themes: Themes = await getThemes();

  if (!themes.has(themeKey)) {
    throw new Error(`Theme with themeKey "${themeKey}" not found`);
  }

  return themes.get(themeKey);
}

export async function setTheme(
  themeKey: ThemeKey,
  theme: Theme,
): Promise<void> {
  const themes: Themes = await getThemes();
  themes.set(themeKey, theme);
  await kv.set(["themes"], themes);
}

export async function getPubs(): Promise<Pubs> {
  const res = await kv.get(["pubs"]);

  if (res.versionstamp === null) {
    return {} as Pubs;
  }

  return new Map(Object.entries(JSON.parse(res.value))) as Pubs;
}

export async function setPubs(pubs: Pubs): Promise<void> {
  await kv.set(["pubs"], JSON.stringify(Object.fromEntries(pubs)));
}

export async function setPub(pubKey: PubKey, pub: Pub): Promise<void> {
  const pubs: Pubs = await getPubs();
  pubs.set(pubKey, pub);
  await setPubs(pubs);
}

export async function getPub(pubKey: PubKey): Promise<Pub> {
  const pubs: Pubs = await getPubs();

  if (!pubs.has(pubKey)) {
    throw new Error(`Pub with pubKey "${pubKey}" not found`);
  }

  return pubs.get(pubKey) as Pub;
}

// Might be a datarace here. Consult Melker or Simon for details.
export async function updatePubKey(
  oldPubKey: PubKey,
  newPubKey: PubKey,
): Promise<void> {
  const pub: Pub = await getPub(oldPubKey);
  const pubs: Pubs = await getPubs();

  pubs.delete(oldPubKey);
  pubs.set(newPubKey, pub);

  await setPubs(pubs);
}

export async function getActivePubs(): Promise<Pub[]> {
  const pubs: Pubs = await getPubs();

  const activePubs: Pub[] = [];

  pubs.forEach((pub) => {
    if (pub.isActive) {
      activePubs.push(pub);
    }
  });

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

  console.log(pub);
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
