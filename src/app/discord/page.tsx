import Link from "next/link";
import { Gamepad2, Languages, MessageCircle, RadioTower, ShieldCheck, Sparkles, Users, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { getDiscordCommunity } from "@/lib/integrations/discord";

const languageRooms = [
  { flag: "🇬🇧", name: "English", channel: "#english-chat", note: "Global chat, quick help, event calls" },
  { flag: "🇲🇳", name: "Монгол", channel: "#mongolian-chat", note: "Монгол тоглогчдын яриа, pack хайх" },
  { flag: "🇯🇵", name: "日本語", channel: "#japanese-chat", note: "日本語の質問、参加案内、雑談" },
  { flag: "🇰🇷", name: "한국어", channel: "#korean-chat", note: "한국어 안내, 파티 모집, 질문" }
];

const channelGroups = [
  {
    title: "🚀 START HERE",
    color: "from-amber-300/20 to-pink-400/10",
    channels: ["👋 #welcome", "📜 #rules", "📢 #announcements", "🟢 #server-status", "🎮 #how-to-join"]
  },
  {
    title: "🦖 COMMUNITY",
    color: "from-emerald-300/20 to-cyan-400/10",
    channels: ["💬 #general-chat", "📸 #screenshots", "🎬 #clips-media", "🤝 #pack-recruitment"]
  },
  {
    title: "🛟 SUPPORT",
    color: "from-sky-300/20 to-indigo-400/10",
    channels: ["🐞 #bug-report", "🚨 #player-report", "📝 #ban-appeal", "📩 #admin-contact"]
  },
  {
    title: "🎙 THE ISLE VOICE",
    color: "from-violet-300/20 to-fuchsia-400/10",
    channels: ["🔊 Lobby", "🦕 Pack Room 1", "🦖 Pack Room 2", "🏁 Event Voice", "🛡 Staff Voice"]
  }
];

const pinnedMessages = [
  {
    title: "👋 #welcome",
    body: "Welcome to THE ISLE ASIA. Pick your language room, read the rules, check server status, then jump into the island. 明るく、楽しく、でもルールはしっかり。"
  },
  {
    title: "🟢 #server-status",
    body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore | Server page: https://the-isle.vercel.app/server"
  },
  {
    title: "🎙 #voice-info",
    body: "Use TAKU Voice for proximity voice, then join Discord voice rooms for packs, events, support, and quick coordination."
  }
];

export default async function DiscordPage() {
  const discord = await getDiscordCommunity();

  return (
    <main className="min-h-screen overflow-hidden pt-24 pb-20">
      <section className="container relative py-12 sm:py-16">
        <div className="absolute left-6 top-10 -z-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-8 top-32 -z-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-bold uppercase text-primary shadow-[0_0_28px_rgba(45,212,191,.16)]">
              <Sparkles className="h-4 w-4" />
              Discord x Website x Server
            </div>
            <h1 className="text-gradient mt-6 max-w-4xl font-display text-5xl font-black leading-none sm:text-7xl">
              Bright Discord hub for JP, MNG, KR, and EN players
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              THE ISLE ASIA Discord is the fun room for language chat, server status, reports, clips, pack recruitment, voice coordination, and website links.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 px-7 text-base">
                <a href={discord.invite}>
                  <MessageCircle className="h-5 w-5" />
                  Join Discord
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 text-base">
                <a href={siteConfig.discordGeneralChannel}>Open General</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 text-base">
                <Link href="/server">
                  <Gamepad2 className="h-5 w-5" />
                  Server Page
                </Link>
              </Button>
            </div>
          </div>

          <Card className="hud-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <RadioTower className="h-6 w-6 text-primary" />
                ASIA JP,MNG,KR Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Address", "209.102.250.73:9075"],
                  ["Region", "Singapore"],
                  ["Website", "the-isle.vercel.app"],
                  ["Discord ID", discord.serverId]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-white/10 bg-black/25 p-4">
                    <div className="text-xs uppercase text-muted-foreground">{label}</div>
                    <div className="mt-1 break-words font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-10">
        <div className="mb-5 flex items-center gap-3">
          <Languages className="h-6 w-6 text-primary" />
          <h2 className="font-display text-3xl font-black">Language rooms</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {languageRooms.map((room) => (
            <Card key={room.channel} className="hud-card transition duration-300 hover:-translate-y-1 hover:border-primary/40">
              <CardContent className="p-5">
                <div className="text-4xl">{room.flag}</div>
                <h3 className="mt-4 text-xl font-black">{room.name}</h3>
                <div className="mt-1 text-sm font-bold text-primary">{room.channel}</div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{room.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="mb-5 flex items-center gap-3">
          <Users className="h-6 w-6 text-secondary" />
          <h2 className="font-display text-3xl font-black">Discord room plan</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {channelGroups.map((group) => (
            <Card key={group.title} className={`border-white/10 bg-gradient-to-br ${group.color} shadow-2xl shadow-black/20 backdrop-blur-xl`}>
              <CardContent className="p-5">
                <h3 className="font-display text-lg font-black">{group.title}</h3>
                <div className="mt-4 space-y-2">
                  {group.channels.map((channel) => (
                    <div key={channel} className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-zinc-100">
                      {channel}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container grid gap-5 py-10 lg:grid-cols-[.85fr_1.15fr]">
        <Card className="hud-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Staff online view
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 text-4xl font-black text-white">{discord.onlineModerators}</div>
            <div className="space-y-3">
              {discord.staff.map((member) => (
                <div key={member.name} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 p-3">
                  <img src={member.avatar} alt="" className="h-10 w-10 rounded-md" />
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role} · {member.discord}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hud-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-6 w-6 text-secondary" />
              Page links to pin in Discord
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["🎮 Server", "/server", "IP, players, Singapore status"],
                ["🎙 Voice", "/voice", "TAKU Voice setup"],
                ["📜 Rules", "/rules", "Rules and reports"],
                ["🦖 Dinosaurs", "/dinosaurs", "Playable guide"],
                ["🗺 Map", "/map", "Gateway routes"],
                ["🏁 Events", "/events", "Weekly community nights"]
              ].map(([title, href, note]) => (
                <Link key={href} href={href} className="rounded-md border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1 hover:border-primary/40">
                  <div className="font-bold text-white">{title}</div>
                  <div className="mt-2 text-xs leading-5 text-muted-foreground">{note}</div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container py-10">
        <div className="mb-5 flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h2 className="font-display text-3xl font-black">Pinned message style</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pinnedMessages.map((message) => (
            <Card key={message.title} className="hud-card">
              <CardContent className="p-5">
                <h3 className="font-display text-xl font-black">{message.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{message.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
