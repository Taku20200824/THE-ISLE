import { z } from "zod";

export const serverStatusSchema = z.object({
  serverName: z.string().min(1).max(80),
  status: z.enum(["online", "offline", "maintenance"]),
  ip: z.string().max(120),
  port: z.coerce.number().int().min(1).max(65535),
  location: z.string().min(1).max(80),
  onlinePlayers: z.coerce.number().int().min(0),
  maxPlayers: z.coerce.number().int().min(1),
  version: z.string().min(1).max(80),
  map: z.string().min(1).max(80),
  discordUrl: z.string().max(240),
  discordServerId: z.string().max(40).default(""),
  description: z.string().min(1).max(700),
  hostingProvider: z.string().min(1).max(80)
});

export type ServerStatusDocument = z.infer<typeof serverStatusSchema> & {
  lastUpdated: Date | string | null;
};

export const initialServerStatus = {
  serverName: "TAKU's The Isle",
  status: "online",
  ip: "",
  port: 7777,
  location: "Hong Kong",
  onlinePlayers: 0,
  maxPlayers: 100,
  version: "Evrima",
  map: "Gateway",
  discordUrl: "https://discord.gg/vmn3YjCZSE",
  discordServerId: "792269772473106452",
  description:
    "An English-speaking The Isle Asia community server for players from Japan, Mongolia, Korea, Hong Kong, Taiwan, Singapore, and Southeast Asia.",
  hostingProvider: "BisectHosting"
} satisfies z.infer<typeof serverStatusSchema>;

export function formatServerAddress(status: Pick<ServerStatusDocument, "ip" | "port">) {
  if (!status.ip) {
    return `IP pending:${status.port}`;
  }

  return status.ip.includes(":") ? status.ip : `${status.ip}:${status.port}`;
}
