"use client";

import { CalendarClock, Gamepad2, Globe2, Headphones, Map, Server, Users } from "lucide-react";
import { CopyIpButton } from "@/components/copy-ip-button";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { useLiveServerStatus } from "@/hooks/use-live-server-status";
import { formatServerAddress, type ServerStatusDocument } from "@/lib/firebase/server-status-shared";

function formatDate(date: Date | string | null, fallback: string) {
  if (!date) {
    return fallback;
  }

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(parsedDate.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(parsedDate);
}

function formatLiveRefreshLabel(label: string) {
  return label.replace(/5s/gi, "15s").replace(/5秒/g, "15秒").replace(/5초/g, "15초").replace(/5 секунд/gi, "15 секунд");
}

export function ServerStatusSummary({ status: initialStatus }: { status: ServerStatusDocument }) {
  const { t } = useLanguage();
  const { status, isRefreshing } = useLiveServerStatus(initialStatus);
  const address = formatServerAddress(status);
  const voiceAddress = status.voiceHost ? `${status.voiceHost}:${status.voicePort}` : t("status.notSynced");
  const liveRefreshLabel = formatLiveRefreshLabel(t("status.liveRefresh"));

  return (
    <Card className="cinematic-panel border-primary/20 bg-white/82 shadow-xl shadow-emerald-900/10 backdrop-blur-xl dark:border-primary/15 dark:bg-[linear-gradient(135deg,rgba(6,20,18,.92),rgba(9,16,26,.78))] dark:shadow-black/30">
      <CardContent className="p-6">
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <StatusBadge status={status.status} />
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <h2 className="font-display text-3xl font-black text-foreground sm:text-4xl dark:text-white">{status.serverName}</h2>
              <span className="mb-1 text-xs uppercase text-muted-foreground">{isRefreshing ? t("status.syncing") : liveRefreshLabel}</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{status.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <CopyIpButton ip={address} />
            {status.voiceHost ? (
              <Button asChild variant="outline">
                <a href="/voice">{t("cta.voiceChat")}</a>
              </Button>
            ) : null}
            {status.discordUrl ? (
              <Button asChild>
                <a href={status.discordUrl}>{t("cta.joinDiscord")}</a>
              </Button>
            ) : (
              <Button disabled>{t("cta.joinDiscord")}</Button>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t("status.address"), value: address, icon: Server },
            { label: t("status.players"), value: `${status.onlinePlayers}/${status.maxPlayers}`, icon: Users },
            { label: t("status.location"), value: status.location, icon: Globe2 },
            { label: t("status.version"), value: status.version, icon: Gamepad2 },
            { label: t("status.map"), value: status.map, icon: Map },
            { label: t("status.hosting"), value: status.hostingProvider, icon: Server },
            { label: t("status.voice"), value: voiceAddress, icon: Headphones },
            { label: t("status.lastUpdated"), value: formatDate(status.lastUpdated, t("status.notSynced")), icon: CalendarClock }
          ].map((item) => (
            <div key={item.label} className="hud-card rounded-md p-4">
              <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
              <div className="relative z-10 mt-2 break-words text-lg font-bold text-foreground dark:text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
