import { Activity, Globe2, RadioTower, Server, Wifi, Zap } from "lucide-react";
import { CopyIpButton } from "@/components/copy-ip-button";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { getServerStatus } from "@/lib/integrations/server-status";

export default async function ServerPage() {
  const status = await getServerStatus();

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Server" title="Hong Kong survival shard" description="Live-ready status surface for BattleMetrics, Steam, or direct query integration." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Activity} label="Status" value={status.online ? "Online" : "Offline"} />
        <StatCard icon={Server} label="Player Count" value={`${status.players}/${status.maxPlayers}`} />
        <StatCard icon={Zap} label="Ping" value={`${status.ping} ms`} />
        <StatCard icon={Globe2} label="Location" value={status.location} />
        <StatCard icon={Wifi} label="Version" value={status.version} />
        <StatCard icon={RadioTower} label="Server IP" value={status.ip} />
      </div>
      <Card className="mt-8">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Connection string</div>
            <div className="mt-1 font-mono text-lg">{status.ip}</div>
          </div>
          <CopyIpButton ip={status.ip} />
        </CardContent>
      </Card>
    </main>
  );
}
