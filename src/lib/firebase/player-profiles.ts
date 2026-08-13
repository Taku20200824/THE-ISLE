import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminFirestore, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { firebaseConfig } from "@/lib/firebase/config";

export type SteamPublicProfile = {
  steamId: string;
  personaName: string;
  avatarUrl: string;
  profileUrl: string;
  isFallback?: boolean;
};

export type PlayerProfile = SteamPublicProfile & {
  username: string;
  playtimeMinutes: number;
  kills: number;
  deaths: number;
  growth: number;
  nest: number;
  favoriteDinosaur: string;
  rankScore: number;
  lastSeen: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

type FirestoreDocument = {
  name?: string;
  fields?: Record<string, unknown>;
};

function parseFirestoreValue(value: unknown): unknown {
  if (!value || typeof value !== "object") return undefined;

  const field = value as Record<string, unknown>;
  if ("stringValue" in field) return field.stringValue;
  if ("integerValue" in field) return Number(field.integerValue);
  if ("doubleValue" in field) return Number(field.doubleValue);
  if ("timestampValue" in field) return String(field.timestampValue);
  if ("booleanValue" in field) return Boolean(field.booleanValue);

  return undefined;
}

function serializeTimestamp(value: unknown) {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return null;
}

function isFallbackPersonaName(value: unknown, steamId: string) {
  return String(value ?? "") === `Steam ${steamId.slice(-6)}`;
}

function toProfile(id: string, data: Record<string, unknown>): PlayerProfile {
  const steamId = String(data.steamId ?? id);
  const playtimeMinutes = Number(data.playtimeMinutes ?? 0);
  const kills = Number(data.kills ?? 0);
  const deaths = Number(data.deaths ?? 0);
  const growth = Number(data.growth ?? data.growthPercent ?? 0);
  const nest = Number(data.nest ?? data.nestSuccess ?? 0);
  const personaName = String(data.personaName ?? data.username ?? steamId);
  const username = String(data.username ?? data.personaName ?? steamId);

  return {
    steamId,
    personaName,
    username,
    avatarUrl: String(data.avatarUrl ?? data.avatar ?? ""),
    profileUrl: String(data.profileUrl ?? `https://steamcommunity.com/profiles/${steamId}`),
    isFallback: isFallbackPersonaName(personaName, steamId) || isFallbackPersonaName(username, steamId),
    playtimeMinutes,
    kills,
    deaths,
    growth,
    nest,
    favoriteDinosaur: String(data.favoriteDinosaur ?? data.dinosaur ?? "Unknown"),
    rankScore: Number(data.rankScore ?? Math.round(playtimeMinutes / 60) * 10 + kills * 25 + nest * 15 + growth - deaths * 5),
    lastSeen: serializeTimestamp(data.lastSeen),
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt)
  };
}

async function getCollectionViaRest(collection: string): Promise<PlayerProfile[]> {
  const projectId = firebaseConfig.projectId ?? process.env.FIREBASE_PROJECT_ID;
  const apiKey = firebaseConfig.apiKey;

  if (!projectId || !apiKey) return [];

  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}?key=${apiKey}`,
    { cache: "no-store" }
  );

  if (!response.ok) return [];

  const payload = (await response.json()) as { documents?: FirestoreDocument[] };
  return (payload.documents ?? []).map((document) => {
    const id = document.name?.split("/").pop() ?? "";
    const data = Object.fromEntries(Object.entries(document.fields ?? {}).map(([key, value]) => [key, parseFirestoreValue(value)]));
    return toProfile(id, data);
  });
}

function createFallbackSteamProfile(steamId: string): SteamPublicProfile {
  return {
    steamId,
    personaName: `Steam ${steamId.slice(-6)}`,
    avatarUrl: `https://api.dicebear.com/9.x/shapes/svg?seed=${steamId}`,
    profileUrl: `https://steamcommunity.com/profiles/${steamId}`,
    isFallback: true
  };
}

function decodeXmlValue(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  const value = match?.[1] ?? match?.[2];

  return value
    ?.replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

async function fetchSteamProfileViaXml(steamId: string, fallback: SteamPublicProfile) {
  const response = await fetch(`https://steamcommunity.com/profiles/${steamId}?xml=1`, { cache: "no-store" });

  if (!response.ok) return fallback;

  const xml = await response.text();
  const personaName = decodeXmlValue(xml, "steamID");
  const avatarUrl = decodeXmlValue(xml, "avatarFull");
  const profileUrl = decodeXmlValue(xml, "steamID64") ? `https://steamcommunity.com/profiles/${steamId}` : fallback.profileUrl;

  if (!personaName && !avatarUrl) return fallback;

  return {
    steamId,
    personaName: personaName || fallback.personaName,
    avatarUrl: avatarUrl || fallback.avatarUrl,
    profileUrl,
    isFallback: false
  };
}

export async function fetchSteamPublicProfile(steamId: string): Promise<SteamPublicProfile> {
  const fallback = createFallbackSteamProfile(steamId);
  const apiKey = process.env.STEAM_WEB_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`,
        { cache: "no-store" }
      );

      if (response.ok) {
        const payload = (await response.json()) as {
          response?: { players?: Array<{ personaname?: string; avatarfull?: string; profileurl?: string }> };
        };
        const player = payload.response?.players?.[0];

        if (player?.personaname || player?.avatarfull) {
          return {
            steamId,
            personaName: player.personaname || fallback.personaName,
            avatarUrl: player.avatarfull || fallback.avatarUrl,
            profileUrl: player.profileurl || fallback.profileUrl,
            isFallback: false
          };
        }
      }
    } catch {
      // Fall through to the public XML profile endpoint below.
    }
  }

  try {
    return await fetchSteamProfileViaXml(steamId, fallback);
  } catch {
    return fallback;
  }
}

export async function getPlayerProfiles() {
  if (!hasFirebaseAdminCredentials()) {
    return getCollectionViaRest("playerProfiles");
  }

  try {
    const snapshot = await getAdminFirestore().collection("playerProfiles").get();
    return snapshot.docs.map((doc) => toProfile(doc.id, doc.data()));
  } catch {
    return getCollectionViaRest("playerProfiles");
  }
}

export async function getPlayerProfile(steamId: string) {
  if (!hasFirebaseAdminCredentials()) {
    return (await getPlayerProfiles()).find((profile) => profile.steamId === steamId) ?? null;
  }

  const snapshot = await getAdminFirestore().collection("playerProfiles").doc(steamId).get();
  return snapshot.exists ? toProfile(snapshot.id, snapshot.data() ?? {}) : null;
}

export async function upsertSteamPlayerProfile(profile: SteamPublicProfile) {
  if (!hasFirebaseAdminCredentials()) {
    return null;
  }

  const ref = getAdminFirestore().collection("playerProfiles").doc(profile.steamId);
  const snapshot = await ref.get();
  const previous = snapshot.exists ? toProfile(snapshot.id, snapshot.data() ?? {}) : null;
  const hasRealPreviousName = previous && !previous.isFallback;
  const safeProfile = profile.isFallback && hasRealPreviousName
    ? {
        steamId: profile.steamId,
        personaName: previous.personaName,
        username: previous.username,
        avatarUrl: previous.avatarUrl,
        profileUrl: previous.profileUrl,
        isFallback: false
      }
    : {
        ...profile,
        username: profile.personaName
      };

  await ref.set(
    {
      ...safeProfile,
      playtimeMinutes: FieldValue.increment(0),
      kills: FieldValue.increment(0),
      deaths: FieldValue.increment(0),
      growth: FieldValue.increment(0),
      nest: FieldValue.increment(0),
      favoriteDinosaur: snapshot.exists ? snapshot.data()?.favoriteDinosaur ?? "Unknown" : "Unknown",
      lastSeen: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      ...(snapshot.exists ? {} : { createdAt: FieldValue.serverTimestamp() })
    },
    { merge: true }
  );

  return getPlayerProfile(profile.steamId);
}

export async function touchSteamPlayerSession(steamId: string, source = "website") {
  if (!hasFirebaseAdminCredentials()) {
    return null;
  }

  const db = getAdminFirestore();
  const sessionRef = db.collection("playerSessions").doc(`${steamId}_${Date.now()}`);
  await sessionRef.set({ steamId, source, seenAt: FieldValue.serverTimestamp() });
  await db.collection("playerProfiles").doc(steamId).set(
    {
      steamId,
      lastSeen: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  return true;
}

export async function addSteamPlaytimeMinutes(steamId: string, minutes: number, source = "server") {
  if (!hasFirebaseAdminCredentials()) {
    return null;
  }

  const safeMinutes = Math.max(0, Math.min(24 * 60, Math.floor(minutes)));
  const ref = getAdminFirestore().collection("playerProfiles").doc(steamId);
  await ref.set(
    {
      steamId,
      playtimeMinutes: FieldValue.increment(safeMinutes),
      lastSeen: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      [`playtimeSources.${source}`]: FieldValue.increment(safeMinutes)
    },
    { merge: true }
  );

  return getPlayerProfile(steamId);
}
