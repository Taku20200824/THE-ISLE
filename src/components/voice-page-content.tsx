"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Headphones, LogIn, Mic2, Radio, Server, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import type { ServerStatusDocument } from "@/lib/firebase/server-status-shared";

export function VoicePageContent({ status }: { status: ServerStatusDocument }) {
  const { locale, t } = useLanguage();
  const [steamSession, setSteamSession] = useState<
    | { state: "loading" }
    | { state: "signedOut" }
    | { state: "signedIn"; steamId: string; mumbleUrl: string | null }
  >({ state: "loading" });
  const isActive = status.voiceStatus === "active" && Boolean(status.voiceHost);
  const hasPlugin = Boolean(status.voicePluginUrl);
  const address = status.voiceHost ? `${status.voiceHost}:${status.voicePort}` : t("page.voice.hostPending");
  const labels = {
    en: {
      steamTitle: "Automatic Steam verification",
      steamBody: "Sign in with Steam once. Your SteamID is signed into the Mumble connection, so no game name or !verify command is needed.",
      steamLogin: "Sign in with Steam",
      steamReady: "Steam verified",
      steamConnect: "Connect with verified Steam",
      steamFailed: "Steam verification failed. Please try again."
    },
    ja: {
      steamTitle: "Steam 閾ｪ蜍戊ｪ崎ｨｼ",
      steamBody: "Steam縺ｧ荳蠎ｦ繝ｭ繧ｰ繧､繝ｳ縺吶ｋ縺ｨ縲ヾteamID縺檎ｽｲ蜷堺ｻ倥″縺ｧMumble謗･邯壹↓貂｡縺輔ｌ縺ｾ縺吶ゅご繝ｼ繝蜷阪・蜈･蜉帙ｄ !verify 縺ｯ荳崎ｦ√〒縺吶・,
      steamLogin: "Steam縺ｧ繝ｭ繧ｰ繧､繝ｳ",
      steamReady: "Steam隱崎ｨｼ貂医∩",
      steamConnect: "隱崎ｨｼ貂医∩Steam縺ｧ謗･邯・,
      steamFailed: "Steam隱崎ｨｼ縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲ゅｂ縺・ｸ蠎ｦ縺願ｩｦ縺励￥縺縺輔＞縲・
    },
    ko: {
      steamTitle: "Steam ・尖徐 ・ｸ・・,
      steamBody: "Steam・・﨑・・・・懋ｷｸ・ｸ﨑俯ｩｴ ・罹ｪ・頗 SteamID・ Mumble ・ｰ・ｰ・・・・峡・ｩ・壱共. ・護桷 ・ｴ・・・・･・ｼ !verify ・・ｹ・ 﨑・囈 ・・慣・壱共.",
      steamLogin: "Steam・ｼ・・・懋ｷｸ・ｸ",
      steamReady: "Steam ・ｸ・・・・｣・,
      steamConnect: "・ｸ・晤頗 Steam・ｼ・・・ｰ・ｰ",
      steamFailed: "Steam ・ｸ・晧乱 ・､甯ｨ嵂溢慣・壱共. ・､・・・罹巡﨑ｴ ・ｼ・ｸ・・"
    },
    mn: {
      steamTitle: "Steam ﾐｰﾐｲﾑひｾﾐｼﾐｰﾑ・ﾐｱﾐｰﾑひｰﾐｻﾐｳﾐｰﾐｰﾐｶﾑτσｻﾐｰﾐｻﾑ・,
      steamBody: "Steam-ﾑ采采 ﾐｽﾑ災ｳ ﾑσｴﾐｰﾐｰ ﾐｽﾑ災ｲﾑび采ﾐｽﾑ・ SteamID ﾐｽﾑ・ﾐｳﾐｰﾑﾑ巾ｽ ﾒｯﾑ・災ｳﾑび災ｹﾐｳﾑ采采 Mumble ﾑ・ｾﾐｻﾐｱﾐｾﾐｻﾑひｾﾐｴ ﾐｾﾑﾐｴﾐｾﾐｳ ﾑびσｻ ﾑひｾﾐｳﾐｻﾐｾﾐｾﾐｼﾑ巾ｽ ﾐｽﾑ采 ﾐｱﾐｸﾑ・ｸﾑ・ﾐｱﾐｾﾐｻﾐｾﾐｽ !verify ﾐｺﾐｾﾐｼﾐｰﾐｽﾐｴ ﾑ・采ﾑ災ｳﾐｳﾒｯﾐｹ.",
      steamLogin: "Steam-ﾑ采采 ﾐｽﾑ災ｲﾑびﾑ采・,
      steamReady: "Steam ﾐｱﾐｰﾑひｰﾐｻﾐｳﾐｰﾐｰﾐｶﾑ・ｰﾐｽ",
      steamConnect: "ﾐ岱ｰﾑひｰﾐｻﾐｳﾐｰﾐｰﾐｶﾑ・ｰﾐｽ Steam-ﾑ采采 ﾑ・ｾﾐｻﾐｱﾐｾﾐｳﾐｴﾐｾﾑ・,
      steamFailed: "Steam ﾐｱﾐｰﾑひｰﾐｻﾐｳﾐｰﾐｰﾐｶﾑτσｻﾐｰﾐｻﾑ・ﾐｰﾐｼﾐｶﾐｸﾐｻﾑひｳﾒｯﾐｹ. ﾐ頒ｰﾑ・ｸﾐｽ ﾐｾﾑﾐｾﾐｻﾐｴﾐｾﾐｽﾐｾ ﾑτ・"
    }
  }[locale];
  const steps = [
    { icon: Download, title: t("page.voice.installTitle"), body: t("page.voice.installBody") },
    { icon: Headphones, title: t("page.voice.connectTitle"), body: t("page.voice.connectBody") },
    { icon: Mic2, title: t("page.voice.pluginTitle"), body: labels.steamBody }
  ];

  useEffect(() => {
    let active = true;
    fetch("/api/steam/session", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("session unavailable");
        return response.json() as Promise<{ authenticated: boolean; steamId?: string; mumbleUrl?: string | null }>;
      })
      .then((session) => {
        if (!active) return;
        setSteamSession(
          session.authenticated && session.steamId
            ? { state: "signedIn", steamId: session.steamId, mumbleUrl: session.mumbleUrl ?? null }
            : { state: "signedOut" }
        );
      })
      .catch(() => active && setSteamSession({ state: "signedOut" }));
    return () => {
      active = false;
    };
  }, []);

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
            {steamSession.state === "signedOut" ? (
              <Button asChild variant="outline" className="w-full">
                <a href="/api/steam/login">
                  <LogIn className="h-4 w-4" />
                  {labels.steamLogin}
                </a>
              </Button>
            ) : null}
            {isActive && steamSession.state === "signedIn" && steamSession.mumbleUrl ? (
              <Button asChild variant="outline" className="w-full">
                <a href={steamSession.mumbleUrl}>{labels.steamConnect}</a>
              </Button>
            ) : null}
            {hasPlugin ? (
              <Button asChild variant="outline" className="w-full">
                <a href={status.voicePluginUrl} download>{t("page.voice.downloadPlugin")}</a>
              </Button>
            ) : null}
          </div>

          <div className="mt-5 rounded-md border border-white/10 bg-white/[.04] p-4 text-sm">
            <p className="font-bold text-white">{labels.steamTitle}</p>
            {steamSession.state === "signedIn" ? (
              <p className="mt-2 text-emerald-300">{labels.steamReady} ﾂｷ {steamSession.steamId}</p>
            ) : (
              <p className="mt-2 leading-6 text-zinc-400">
                {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("steam") === "failed"
                  ? labels.steamFailed
                  : labels.steamBody}
              </p>
            )}
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
