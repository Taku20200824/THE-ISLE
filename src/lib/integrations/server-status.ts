import { getServerStatusOrInitial } from "@/lib/firebase/server-status";
import type { ServerStatusDocument } from "@/lib/firebase/server-status-shared";

type GameDigState = {
  name?: string;
  map?: string;
  maxplayers?: number;
  numplayers?: number;
  players?: unknown[];
  ping?: number;
  raw?: {
    version?: string;
    serverversion?: string;
  };
};

type GameDigModule = {
  GameDig: {
    query(options: {
      type: "tie" | "theisle";
      host: string;
      port: number;
      socketTimeout?: number;
      attemptTimeout?: number;
      maxRetries?: number;
    }): Promise<GameDigState>;
  };
};

function normalizeHost(ip: string) {
  return ip.includes(":") ? ip.split(":")[0] : ip;
}

function getQueryPort(status: ServerStatusDocument) {
  const configuredPort = Number(process.env.SERVER_QUERY_PORT);

  if (Number.isInteger(configuredPort) && configuredPort > 0 && configuredPort <= 65535) {
    return configuredPort;
  }

  return status.port;
}

function applyLiveQuery(status: ServerStatusDocument, query: GameDigState): ServerStatusDocument {
  const playerCount = typeof query.numplayers === "number" ? query.numplayers : query.players?.length;

  return {
    ...status,
    serverName: query.name?.trim() || status.serverName,
    status: "online",
    onlinePlayers: typeof playerCount === "number" ? playerCount : status.onlinePlayers,
    maxPlayers: typeof query.maxplayers === "number" && query.maxplayers > 0 ? query.maxplayers : status.maxPlayers,
    map: query.map?.trim() || status.map,
    version: query.raw?.version || query.raw?.serverversion || status.version,
    lastUpdated: new Date().toISOString()
  };
}

function serializeServerStatus(status: ServerStatusDocument): ServerStatusDocument {
  return {
    ...status,
    lastUpdated: status.lastUpdated instanceof Date ? status.lastUpdated.toISOString() : status.lastUpdated
  };
}

async function queryTheIsleServer(status: ServerStatusDocument): Promise<ServerStatusDocument> {
  if (process.env.SERVER_QUERY_ENABLED === "false" || !status.ip) {
    return status;
  }

  const host = normalizeHost(status.ip);
  const port = getQueryPort(status);

  try {
    const { GameDig } = (await import("gamedig")) as GameDigModule;
    const queryOptions = {
      host,
      port,
      socketTimeout: 2500,
      attemptTimeout: 3500,
      maxRetries: 0
    };

    try {
      return applyLiveQuery(status, await GameDig.query({ ...queryOptions, type: "tie" }));
    } catch {
      return applyLiveQuery(status, await GameDig.query({ ...queryOptions, type: "theisle" }));
    }
  } catch {
    return {
      ...status,
      status: status.status === "maintenance" ? "maintenance" : "offline",
      onlinePlayers: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

export async function getServerStatus() {
  return serializeServerStatus(await queryTheIsleServer(await getServerStatusOrInitial()));
}
