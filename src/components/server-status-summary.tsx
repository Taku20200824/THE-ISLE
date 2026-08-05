"use client";

import { CalendarClock, Gamepad2, Globe2, Map, Server, Users } from "lucide-react";
import { CopyIpButton } from "@/components/copy-ip-button";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveServerStatus } from "@/hooks/use-live-server-status";
import { formatServerAddress, type ServerStatusDocument } from "@/lib/firebase/server-status-shared";

function formatDate(date: Date | string | null) {
  if (!date) {
    return "Not synced yet";
  }

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not synced yet";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(parsedDate);
}

export function ServerStatusSummary({ status: initialStatus }: { status: ServerStatusDocument }) {
  const { status, isRefreshing } = useLiveServerStatus(initialStatus);
  const address = formatServerAddress(status);

  return (
    <Card className="cinematic-panel border-primary/15 bg-[linear-gradient(135deg,rgba(6,20,18,.92),rgba(9,16,26,.78))]">
      <CardContent className="p-6">
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <StatusBadge status={status.status} />
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <h2 className="font-display text-3xl font-black text-white sm:text-4xl">{status.serverName}</h2>
              <span className="mb-1 text-xs uppercase text-muted-foreground">{isRefreshing ? "Syncing live status" : "Live refresh every 5s"}</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{status.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <CopyIpButton ip={address} />
            {status.discordUrl ? (
              <Button asChild>
                <a href={status.discordUrl}>Join Discord</a>
              </Button>
            ) : (
              <Button disabled>Join Discord</Button>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Address", value: address, icon: Server },
            { label: "Players", value: `${status.onlinePlayers}/${status.maxPlayers}`, icon: Users },
            { label: "Location", value: status.location, icon: Globe2 },
            { label: "Version", value: status.version, icon: Gamepad2 },
            { label: "Map", value: status.map, icon: Map },
            { label: "Hosting", value: status.hostingProvider, icon: Server },
            { label: "Last Updated", value: formatDate(status.lastUpdated), icon: CalendarClock }
          ].map((item) => (
            <div key={item.label} className="hud-card rounded-md p-4">
              <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
              <div className="relative z-10 mt-2 break-words text-lg font-bold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
