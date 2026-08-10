"use client";

import { Download, ExternalLink, Headphones, Mic2, Radio, Server, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import type { ServerStatusDocument } from "@/lib/firebase/server-status-shared";

export function VoicePageContent({ status }: { status: ServerStatusDocument }) {
  const { t } = useLanguage();
  const isActive = status.voiceStatus === "active" && Boolean(status.voiceHost);
  const hasPlugin = Boolean(status.voicePluginUrl);
  const address = status.voiceHost ? `${status.voiceHost}:${status.voicePort}` : t("page.voice.hostPending");
  const mumbleUrl = status.voiceHost ? `mumble://${status.voiceHost}:${status.voicePort}` : "";
  const steps = [
    { icon: Download, title: t("page.voice.installTitle"), body: t("page.voice.installBody") },
    { icon: Headphones, title: t("page.voice.connectTitle"), body: t("page.voice.connectBody") },
    { icon: Mic2, title: t("page.voice.pluginTitle"), body: t("page.voice.pluginBody") }
  ];

  return (
    <main className="container min-h-screen pt-32 pb-20 sm:pt-36">
      <SectionHeading
        eyebrow={t("page.voice.eyebrow")}
        title={t("page.voice.title")}
        description={t("page.voice.description")}
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="bg-white/[.04]">
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-md border border-primary/25 bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-xs font-black text-zinc-600">0{index + 1}</span>
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">{step.body}</CardContent>
              </Card>
            );
          })}
        </div>

        <aside className="rounded-lg border border-white/10 bg-black/35 p-6 shadow-[0_24px_80px_rgba(0,0,0,.35)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Radio className="h-4 w-4" />
            {t("page.voice.service")}
          </div>
          <h2 className="mt-4 font-display text-2xl font-black text-white">{status.voiceProvider}</h2>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-white/10 bg-white/[.04] px-3 py-2 text-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${isActive ? "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.8)]" : "bg-amber-400"}`} />
            <span className="font-bold text-white">{isActive ? t("page.voice.online") : t("page.voice.pending")}</span>
          </div>

          <div className="mt-5 rounded-md border border-white/10 bg-white/[.04] p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
              <Server className="h-4 w-4" /> {t("page.voice.address")}
            </div>
            <p className="mt-2 break-all font-mono text-sm text-white">{address}</p>
            <p className="mt-2 text-xs text-zinc-500">{t("page.voice.channel")}: {status.voiceChannel}</p>
          </div>

          <div className="mt-5 grid gap-3">
            <Button asChild className="w-full">
              <a href={status.voiceUrl} target="_blank" rel="noopener noreferrer">
                {t("page.voice.downloadMumble")}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            {isActive ? (
              <Button asChild variant="outline" className="w-full">
                <a href={mumbleUrl}>{t("page.voice.connectButton")}</a>
              </Button>
            ) : null}
            {hasPlugin ? (
              <Button asChild variant="outline" className="w-full">
                <a href={status.voicePluginUrl} download>{t("page.voice.downloadPlugin")}</a>
              </Button>
            ) : null}
          </div>

          <div className="mt-6 rounded-md border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-zinc-300">
            <div className="flex items-center gap-2 font-bold text-white">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {t("page.voice.safeTitle")}
            </div>
            <p className="mt-2">{t("page.voice.safeBody")}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

