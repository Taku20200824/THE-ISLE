import Link from "next/link";
import { Activity, Cable, MapPin, MessageCircle, RadioTower, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/motion";
import { siteConfig } from "@/data/site";
import { formatServerAddress, type ServerStatusDocument } from "@/lib/firebase/server-status-shared";

export function Hero({ serverStatus }: { serverStatus: ServerStatusDocument }) {
  const address = formatServerAddress(serverStatus);
  const stats = [
    { label: "Status", value: serverStatus.status, icon: RadioTower },
    { label: "Players", value: `${serverStatus.onlinePlayers}/${serverStatus.maxPlayers}`, icon: Users },
    { label: "Address", value: address, icon: Cable },
    { label: "Location", value: serverStatus.location, icon: MapPin }
  ];

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
          <Badge className="border-primary/30 bg-primary/10 text-primary shadow-[0_0_30px_rgba(45,212,191,.16)]">English-speaking Asia community</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-black leading-none text-white drop-shadow-[0_0_34px_rgba(255,255,255,.16)] sm:text-7xl lg:text-8xl">
            THE ISLE ASIA
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">
            A premium Hong Kong hosted community for survival, PvP, nesting, events, and regional coordination across Japan, Mongolia, Korea, Hong Kong, Taiwan, Singapore, and Southeast Asia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-14 px-8 text-base">
              <a href={serverStatus.discordUrl || siteConfig.discordInvite}>
                <MessageCircle className="h-5 w-5" />
                Join Discord
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
              <Link href="/server">
                <Cable className="h-5 w-5" />
                Connect Server
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="hud-card rounded-lg p-5">
                <div className="flex items-center gap-2 text-xs uppercase text-zinc-400">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </div>
                <div className="relative z-10 mt-3 break-words text-2xl font-black text-white">{item.value}</div>
              </div>
            ))}
          </div>
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
