"use client";

import { Cable, MapPin, RadioTower, RefreshCw, Users } from "lucide-react";
import { useLiveServerStatus } from "@/hooks/use-live-server-status";
import { formatServerAddress, type ServerStatusDocument } from "@/lib/firebase/server-status-shared";
import { cn } from "@/lib/utils";

export function LiveHeroStats({ initialStatus }: { initialStatus: ServerStatusDocument }) {
  const { status, isRefreshing } = useLiveServerStatus(initialStatus);
  const address = formatServerAddress(status);
  const stats = [
    { label: "Status", value: status.status, icon: RadioTower },
    { label: "Players", value: `${status.onlinePlayers}/${status.maxPlayers}`, icon: Users },
    { label: "Address", value: address, icon: Cable },
    { label: "Location", value: status.location, icon: MapPin }
  ];

  return (
    <div className="mt-12 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.label} className="hud-card rounded-lg p-5">
          <div className="flex items-center gap-2 text-xs uppercase text-zinc-400">
            <item.icon className="h-4 w-4 text-primary" />
            {item.label}
            {item.label === "Status" ? (
              <RefreshCw className={cn("ml-auto h-3 w-3 text-zinc-500", isRefreshing && "animate-spin text-primary")} />
            ) : null}
          </div>
          <div className="relative z-10 mt-3 break-words text-2xl font-black text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
