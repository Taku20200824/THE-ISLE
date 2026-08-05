"use client";

import Link from "next/link";
import { Activity, Cable, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { LiveHeroStats } from "@/components/live-hero-stats";
import { MotionDiv } from "@/components/motion";
import { siteConfig } from "@/data/site";
import type { ServerStatusDocument } from "@/lib/firebase/server-status-shared";

export function Hero({ serverStatus }: { serverStatus: ServerStatusDocument }) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[94vh] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="h-full w-full scale-105 object-cover opacity-70"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />
        <div className="particles" />
        <div className="scanlines" />
      </div>
      <div className="container relative z-10 flex min-h-[calc(94vh-4rem)] items-center">
        <MotionDiv initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-5xl py-20">
          <Badge className="border-primary/30 bg-primary/10 text-primary shadow-[0_0_30px_rgba(45,212,191,.16)]">{t("hero.badge")}</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-black leading-none text-white drop-shadow-[0_0_34px_rgba(255,255,255,.16)] sm:text-7xl lg:text-8xl">
            THE ISLE ASIA
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">
            {t("hero.body")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-14 px-8 text-base">
              <a href={serverStatus.discordUrl || siteConfig.discordInvite}>
                <MessageCircle className="h-5 w-5" />
                {t("cta.joinDiscord")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
              <Link href="/server">
                <Cable className="h-5 w-5" />
                {t("cta.connectServer")}
              </Link>
            </Button>
          </div>
          <LiveHeroStats initialStatus={serverStatus} />
          <div className="mt-8 flex max-w-3xl flex-wrap gap-2 text-xs uppercase text-zinc-400">
            {siteConfig.regions.map((region) => (
              <span key={region} className="rounded border border-white/10 bg-black/25 px-3 py-2 backdrop-blur">
                <Activity className="mr-1 inline h-3 w-3 text-secondary" />
                {region}
              </span>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
