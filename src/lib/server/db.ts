import {
  Pub,
  PubId,
  PubKey,
  PubKeys,
  Pubs,
  QueueStatus,
  Theme,
  ThemeId,
  Themes,
} from "$lib/types.ts";

export const kv = await Deno.openKv("db.sqlite");

async function getPubKeys(): Promise<PubKeys> {
  const res = await kv.get(["PubKeys"]);

  if (res.versionstamp === null) {
    return new Map() as PubKeys;
  }

  return res.value as PubKeys;
}

async function setPubKeys(pubKeys: PubKeys): Promise<void> {
  await kv.set(["PubKeys"], pubKeys);
}

export async function getPubId(pubKey: PubKey): Promise<PubId> {
  const pubKeys: PubKeys = await getPubKeys();

  if (!pubKeys.has(pubKey)) {
    throw new Error(`pubKey ${pubKey} does not exist`);
  }

  return pubKeys.get(pubKey) as PubKey;
}

export async function setPubKeyIdPair(
  pubKey: PubKey,
  pubId: PubId,
): Promise<void> {
  const pubKeys: PubKeys = await getPubKeys();
  pubKeys.set(pubKey, pubId);
  await setPubKeys(pubKeys);
}

// Might be a datarace here. Consult Melker or Simon for details.
export async function updatePubKey(
  oldPubKey: PubKey,
  newPubKey: PubKey,
): Promise<void> {
  const pubKeys: PubKeys = await getPubKeys();
  const pubId: PubId = await getPubId(oldPubKey);

  pubKeys.delete(oldPubKey);
  pubKeys.set(newPubKey, pubId);

  await setPubKeys(pubKeys);
}

export async function getThemes(): Promise<Themes> {
  const res = await kv.get(["Themes"]);

  if (res.versionstamp === null) {
    return new Map() as Themes;
  }

  return res.value as Themes;
}

export async function setThemes(themes: Themes): Promise<void> {
  await kv.set(["Themes"], themes);
}

export async function getTheme(themeId: ThemeId): Promise<Theme> {
  const themes: Themes = await getThemes();

  if (!themes.has(themeId)) {
    throw new Error(`Theme with themeId "${themeId}" not found`);
  }

  return themes.get(themeId) as Theme;
}

export async function setTheme(
  themeId: ThemeId,
  theme: Theme,
): Promise<void> {
  const themes: Themes = await getThemes();
  themes.set(themeId, theme);
  await kv.set(["Themes"], themes);
}

export async function getPubs(): Promise<Pubs> {
  const res = await kv.get(["Pubs"]);

  if (res.versionstamp === null) {
    return new Map() as Pubs;
  }

  return res.value as Pubs;
}

export async function setPubs(pubs: Pubs): Promise<void> {
  await kv.set(["Pubs"], pubs);
}

export async function setPub(pubId: PubId, pub: Pub): Promise<void> {
  const pubs: Pubs = await getPubs();
  pubs.set(pubId, pub);
  await setPubs(pubs);
}

export async function getPub(pubId: PubId): Promise<Pub> {
  const pubs: Pubs = await getPubs();

  if (!pubs.has(pubId)) {
    throw new Error(`Pub with pubId "${pubId}" not found`);
  }

  return pubs.get(pubId) as Pub;
}

export async function getActivePubs(): Promise<Pubs> {
  const pubs: Pubs = await getPubs();
  const activePubs: Pubs = new Map() as Pubs;

  pubs.forEach((pub: Pub, pubId: PubId) => {
    if (pub.isActive) {
      activePubs.set(pubId, pub);
    }
  });

  return activePubs;
}

export async function setPubOccupancy(
  pubId: PubId,
  occupancy: number,
): Promise<void> {
  const pub: Pub = await getPub(pubId);

  if (occupancy < 0) {
    throw new Error(`occupancy (${occupancy}) must be non-negative`);
  }

  if (occupancy > pub.capacity) {
    throw new Error(
      `occupancy (${occupancy}) cannot exceed capacity (${pub.capacity})`,
    );
  }

  pub.occupancy = occupancy;

  await setPub(pubId, pub);
}

export async function updatePubOccupancy(
  pubId: PubId,
  delta: number,
): Promise<void> {
  const pub: Pub = await getPub(pubId);
  const newOccupancy = pub.occupancy + delta;

  await setPubOccupancy(pubId, newOccupancy);
}

export async function setPubCapacity(
  pubId: PubId,
  capacity: number,
): Promise<void> {
  if (capacity < 0) {
    throw new Error(`capacity (${capacity}) must be non-negative`);
  }

  const pub: Pub = await getPub(pubId);

  if (capacity < pub.occupancy) {
    throw new Error(
      `capacity (${capacity}) must be greater than or equal to occupancy (${pub.occupancy}))`,
    );
  }

  pub.capacity = capacity;

  await setPub(pubId, pub);
}

export async function setPubQueueStatus(
  pubId: PubId,
  queueStatus: QueueStatus,
): Promise<void> {
  const pub: Pub = await getPub(pubId);
  pub.queueStatus = queueStatus;

  await setPub(pubId, pub);
}

export async function setPubTheme(
  pubId: PubId,
  themeId: ThemeId,
): Promise<void> {
  const pub: Pub = await getPub(pubId);
  pub.themeId = themeId;

  await setPub(pubId, pub);
}
