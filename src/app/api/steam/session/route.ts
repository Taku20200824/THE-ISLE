import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fetchSteamPublicProfile, getPlayerProfile, touchSteamPlayerSession, upsertSteamPlayerProfile } from "@/lib/firebase/player-profiles";
import { getServerStatusOrInitial } from "@/lib/firebase/server-status";
import { createSignedMumbleName, readSteamVoiceCookie, steamVoiceCookieName } from "@/lib/steam-voice";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const cookieStore = await cookies();
  const steamId = readSteamVoiceCookie(cookieStore.get(steamVoiceCookieName)?.value);

  if (!steamId) {
    return NextResponse.json({ authenticated: false });
  }

  const status = await getServerStatusOrInitial();
  const mumbleUrl = status.voiceHost
    ? `mumble://${encodeURIComponent(createSignedMumbleName(steamId))}@${status.voiceHost}:${status.voicePort}`
    : null;

  let profile = await getPlayerProfile(steamId);

  if (!profile) {
    try {
      profile = await upsertSteamPlayerProfile(await fetchSteamPublicProfile(steamId));
    } catch {
      profile = null;
    }
  }

  try {
    await touchSteamPlayerSession(steamId, "website-session");
  } catch {
    // Session reads should remain fast even if Firebase Admin is not configured.
  }

  return NextResponse.json({ authenticated: true, steamId, mumbleUrl, profile });
}