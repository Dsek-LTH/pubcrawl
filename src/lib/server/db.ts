import { Pub, PubKey, Theme, ThemeKey, QueueStatus } from "$lib/types.ts";

export async function setTheme(themeKey: ThemeKey, theme: Theme): Promise<void> {
  const kv = await Deno.openKv();
  await kv.set(["themes", themeKey], theme);
}

export async function getTheme(themeKey: ThemeKey): Promise<Theme> {
  const kv = await Deno.openKv();
  const res = await kv.get(["themes", themeKey]);

  const theme = res.value as Theme | null;

  if (theme === null) {
    throw new Error(`Theme with themeKey "${themeKey}" not found`);
  }

  return theme;
}

export async function setPub(pubKey: PubKey, pub: Pub): Promise<void> {
  const kv = await Deno.openKv();
  await kv.set(["pubs", pubKey], pub);
}

export async function getPub(pubKey: PubKey): Promise<Pub> {
  const kv = await Deno.openKv();
  const res = await kv.get(["pubs", pubKey]);

  const pub = res.value as Pub | null;

  if (pub === null) {
    throw new Error(`Pub with counterKey "${pubKey}" not found`);
  }

  return pub;
}

export async function updatePubKey(oldPubKey: PubKey, newPubKey: PubKey): Promise<void> {
    const pub: Pub = await getPub(oldPubKey);
    
    const kv = await Deno.openKv();
    await kv.delete(["pubs", oldPubKey])
    await kv.set(["pubs", newPubKey], pub);
}

export async function getActivePubs(): Promise<Pub[]> {
    const kv = await Deno.openKv();
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

export async function setPubOccupancy(pubKey: PubKey, occupancy: number): Promise<void> {
    const pub: Pub = await getPub(pubKey);
    
    if (occupancy < 0) {
        throw new Error(`occupancy (${occupancy}) must be non-negative`);
    }

    if (occupancy > pub.capacity) {
        throw new Error(`occupancy (${occupancy}) cannot exeed capacity (${pub.capacity})`);
    }

    pub.occupancy = occupancy;
    
    setPub(pubKey, pub);
}

export async function updatePubOccupancy(pubKey: PubKey, delta: number): Promise<void> {
    const pub: Pub = await getPub(pubKey);
    const newOccupancy = pub.occupancy + delta;

    setPubOccupancy(pubKey, newOccupancy);
}

export async function setPubCapacity(pubKey: PubKey, capacity: number): Promise<void> {
    if (capacity < 0) {
        throw new Error(`capacity (${capacity}) must be non-negative`);
    }

    const pub: Pub = await getPub(pubKey);
    
    if (capacity < pub.occupancy) {
        throw new Error(`capacity (${capacity}) must be greater than or equal to occupancy (${pub.occupancy}))`);
    }

    pub.capacity = capacity;
    
    setPub(pubKey, pub);
}

export async function setPubQueueStatus(pubKey: PubKey, queueStatus: QueueStatus): Promise<void> {
    const pub: Pub = await getPub(pubKey);
    pub.queueStatus = queueStatus;
    
    setPub(pubKey, pub);
}

export async function setPubTheme(pubKey: PubKey, themeKey: ThemeKey): Promise<void> {
    const pub: Pub = await getPub(pubKey);
    pub.themeKey = themeKey;
    
    setPub(pubKey, pub);
}
