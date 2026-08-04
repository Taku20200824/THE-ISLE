import { serverStatus } from "@/data/site";

export type ServerStatus = typeof serverStatus;

export async function getServerStatus(): Promise<ServerStatus> {
  // Replace this with BattleMetrics or a direct server query adapter.
  return serverStatus;
}
