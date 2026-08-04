import { CalendarClock, Gamepad2, Globe2, Map, Server, Users } from "lucide-react";
import { CopyIpButton } from "@/components/copy-ip-button";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export function ServerStatusSummary({ status }: { status: ServerStatusDocument }) {
  const address = formatServerAddress(status);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <StatusBadge status={status.status} />
            <h2 className="mt-4 text-3xl font-bold">{status.serverName}</h2>
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

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Address", value: address, icon: Server },
            { label: "Players", value: `${status.onlinePlayers}/${status.maxPlayers}`, icon: Users },
            { label: "Location", value: status.location, icon: Globe2 },
            { label: "Version", value: status.version, icon: Gamepad2 },
            { label: "Map", value: status.map, icon: Map },
            { label: "Hosting", value: status.hostingProvider, icon: Server },
            { label: "Last Updated", value: formatDate(status.lastUpdated), icon: CalendarClock }
          ].map((item) => (
            <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
              <div className="mt-2 break-words font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
