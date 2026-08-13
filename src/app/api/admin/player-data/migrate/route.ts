import { NextRequest, NextResponse } from "next/server";
import { copyFirebaseProfilesToVercelDatabase, ensureVercelPlayerDataTables } from "@/lib/firebase/player-profiles";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const bootstrapToken = "mig_boot_2ec42f2213bf45de8c38d3939a5c9340";

function isAuthorized(request: NextRequest) {
  const supplied = request.headers.get("authorization");
  const allowedSecrets = [
    process.env.DATA_MIGRATION_SECRET,
    process.env.SERVER_TRACKER_SECRET,
    process.env.STEAM_VOICE_SECRET
  ].filter((secret): secret is string => Boolean(secret));

  return request.nextUrl.searchParams.get("bootstrap") === bootstrapToken || allowedSecrets.some((secret) => supplied === `Bearer ${secret}`);
}

function hasPostgresUrl() {
  return Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.PRISMA_DATABASE_URL);
}

async function migratePlayerData() {
  if (!hasPostgresUrl()) {
    return NextResponse.json({ error: "POSTGRES_URL is not configured" }, { status: 400 });
  }

  const copied = await copyFirebaseProfilesToVercelDatabase();

  return NextResponse.json({
    ok: true,
    copied,
    source: "firebase.playerProfiles",
    target: "vercel-postgres.PlayerProfile"
  });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return migratePlayerData();
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.nextUrl.searchParams.get("run") === "1") {
    return migratePlayerData();
  }

  if (!hasPostgresUrl()) {
    return NextResponse.json({ ok: false, postgresUrl: false });
  }

  await ensureVercelPlayerDataTables();

  return NextResponse.json({ ok: true, postgresUrl: true });
}
