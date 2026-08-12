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
  const serverName = status.serverName || "ASIA JP,MNG,KR Test";
  const voiceName = `${serverName} Voice`;
  const voiceProviderName = `${voiceName} (Mumble)`;
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
      pageTitle: `${serverName} voice chat`,
      pageDescription: `${serverName}'s Mumble service provides automatic server-side Evrima proximity voice.`,
      connectTitle: `Connect to ${voiceName}`,
      connectBody: "Use the host and port shown here. Keep Mumble open while you play Evrima.",
      steamTitle: "Automatic Steam verification",
      steamBody: "Sign in with Steam once. Your SteamID is signed into the Mumble connection, so no game name or !verify command is needed.",
      steamLogin: "Sign in with Steam",
      steamReady: "Steam verified",
      steamConnect: "Connect with verified Steam",
      steamFailed: "Steam verification failed. Please try again."
    },
    ja: {
      pageTitle: `${serverName} ボイスチャット`,
      pageDescription: `${serverName} の Mumble サービスで、Evrima のサーバー側近接ボイスチャットを自動提供します。`,
      connectTitle: `${voiceName} に接続`,
      connectBody: "ここに表示されたホストとポートを使用します。Evrima のプレイ中は Mumble を起動したままにしてください。",
      steamTitle: "Steam 自動認証",
      steamBody: "Steamで一度ログインすると、SteamIDが署名付きでMumble接続に渡されます。ゲーム名の入力や !verify は不要です。",
      steamLogin: "Steamでログイン",
      steamReady: "Steam認証済み",
      steamConnect: "認証済みSteamで接続",
      steamFailed: "Steam認証に失敗しました。もう一度お試しください。"
    },
    ko: {
      pageTitle: `${serverName} 음성 채팅`,
      pageDescription: `${serverName} Mumble 서비스가 Evrima 서버 기반 근접 음성 채팅을 자동으로 제공합니다.`,
      connectTitle: `${voiceName} 연결`,
      connectBody: "여기에 표시된 호스트와 포트를 사용하세요. Evrima를 플레이하는 동안 Mumble을 실행해 두세요.",
      steamTitle: "Steam 자동 인증",
      steamBody: "Steam에 한 번 로그인하면 서명된 SteamID가 Mumble 연결에 전달됩니다. 게임 이름 입력과 !verify 명령은 필요 없습니다.",
      steamLogin: "Steam으로 로그인",
      steamReady: "Steam 인증 완료",
      steamConnect: "인증된 Steam으로 연결",
      steamFailed: "Steam 인증에 실패했습니다. 다시 시도해 주세요."
    },
    mn: {
      pageTitle: `${serverName}-ийн дуут чат`,
      pageDescription: `${serverName}-ийн Mumble үйлчилгээ нь Evrima-д сервер талаас автоматаар ойрын зайн дуут чат ажиллуулна.`,
      connectTitle: `${voiceName}-д холбогдох`,
      connectBody: "Энд байгаа host болон port-ыг ашиглана. Evrima тоглож байхдаа Mumble-ийг нээлттэй байлгана уу.",
      steamTitle: "Steam автомат баталгаажуулалт",
      steamBody: "Steam-ээр нэг удаа нэвтэрнэ. SteamID нь гарын үсэгтэйгээр Mumble холболтод ордог тул тоглоомын нэр бичих болон !verify команд хэрэггүй.",
      steamLogin: "Steam-ээр нэвтрэх",
      steamReady: "Steam баталгаажсан",
      steamConnect: "Баталгаажсан Steam-ээр холбогдох",
      steamFailed: "Steam баталгаажуулалт амжилтгүй. Дахин оролдоно уу."
    }
  }[locale];
  const steps = [
    { icon: Download, title: t("page.voice.installTitle"), body: t("page.voice.installBody") },
    { icon: Headphones, title: labels.connectTitle, body: labels.connectBody },
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
        eyebrow={voiceName}
        title={labels.pageTitle}
        description={labels.pageDescription}
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
          <h2 className="mt-4 font-display text-2xl font-black text-white">{voiceProviderName}</h2>
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
              <p className="mt-2 text-emerald-300">{labels.steamReady} · {steamSession.steamId}</p>
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
