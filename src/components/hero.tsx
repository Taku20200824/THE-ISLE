import Link from "next/link";
import { Activity, Cable, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MotionDiv } from "@/components/motion";
import { serverStatus, siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1800&q=85"
          alt=""
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,6,.94),rgba(3,7,6,.55),rgba(3,7,6,.92))]" />
        <div className="particles" />
      </div>
      <div className="container relative z-10 flex min-h-[calc(92vh-4rem)] items-center">
        <MotionDiv initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl py-20">
          <Badge>English-speaking Asia community</Badge>
          <h1 className="mt-6 font-display text-5xl font-black leading-tight text-white sm:text-7xl lg:text-8xl">
            THE ISLE ASIA
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            A premium Hong Kong hosted community for survival, PvP, nesting, events, and regional coordination across Japan, Mongolia, Korea, Hong Kong, Taiwan, Singapore, and Southeast Asia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={siteConfig.discordInvite}>
                <MessageCircle className="h-5 w-5" />
                Join Discord
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/server">
                <Cable className="h-5 w-5" />
                Connect Server
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Status", serverStatus.online ? "Online" : "Offline"],
              ["Players", `${serverStatus.players}/${serverStatus.maxPlayers}`],
              ["Ping", `${serverStatus.ping} ms`],
              ["Location", serverStatus.location]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs uppercase text-zinc-400">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  {label}
                </div>
                <div className="mt-2 text-xl font-bold text-white">{value}</div>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
