import { NextResponse } from "next/server";
import { getServerStatus } from "@/lib/integrations/server-status";

export async function GET() {
  return NextResponse.json(await getServerStatus());
}
