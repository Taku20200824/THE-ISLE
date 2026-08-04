import { getServerStatusOrInitial } from "@/lib/firebase/server-status";

export async function getServerStatus() {
  return getServerStatusOrInitial();
}
