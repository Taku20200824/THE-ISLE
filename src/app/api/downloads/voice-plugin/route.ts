import { NextResponse } from "next/server";
import { getServerStatusOrInitial } from "@/lib/firebase/server-status";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const fallbackPluginUrl = "https://157-230-40-149.nip.io/downloads/TAKU-Voice-Proximity-v0.1.zip";
const downloadFilename = "ASIA-JP-MNG-KR-Test-Voice-Proximity-v0.1.zip";

export async function GET() {
  const status = await getServerStatusOrInitial();
  const sourceUrl = status.voicePluginUrl || fallbackPluginUrl;

  try {
    const response = await fetch(sourceUrl, { cache: "no-store" });

    if (!response.ok || !response.body) {
      return NextResponse.redirect(sourceUrl);
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/zip",
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.redirect(sourceUrl);
  }
}
