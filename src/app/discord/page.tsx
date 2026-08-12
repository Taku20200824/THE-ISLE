import Link from "next/link";
import { Gamepad2, Languages, MessageCircle, RadioTower, ShieldCheck, Sparkles, Star, Users, Volume2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/data/site";
import { getDiscordCommunity } from "@/lib/integrations/discord";

const languageRooms = [
  { flag: "🇬🇧", name: "English", channel: "#english-chat", note: "🎮 Global chat, quick help, event calls, pack finder", style: "from-sky-300/25 via-cyan-300/10 to-white/5" },
  { flag: "🇲🇳", name: "Монгол", channel: "#mongolian-chat", note: "🦖 Монгол тоглогчдын яриа, pack хайх, тусламж авах", style: "from-blue-400/25 via-red-400/10 to-yellow-300/10" },
  { flag: "🇯🇵", name: "日本語", channel: "#japanese-chat", note: "🌸 日本語の質問、参加案内、雑談、イベント連絡", style: "from-rose-300/25 via-pink-300/10 to-white/5" },
  { flag: "🇰🇷", name: "한국어", channel: "#korean-chat", note: "⚡ 한국어 안내, 파티 모집, 질문, 서버 정보", style: "from-indigo-300/25 via-fuchsia-300/10 to-cyan-300/10" }
];

const multilingualGuides = [
  {
    flag: "🇬🇧",
    lang: "English",
    title: "🎮 Join, read rules, find a pack",
    body: "Use Discord for server status, rules, reports, clips, voice rooms, and event calls. Keep chat friendly and useful.",
    style: "from-sky-400/25 via-cyan-300/10 to-white/5"
  },
  {
    flag: "🇲🇳",
    lang: "Монгол",
    title: "🦖 Дүрмээ уншаад pack-аа олоорой",
    body: "Discord дээр server status, дүрэм, report, clip, voice room, event мэдээлэл бүгд байна. Найрсаг, хөгжилтэй байцгаая.",
    style: "from-blue-500/25 via-red-400/10 to-yellow-300/10"
  },
  {
    flag: "🇯🇵",
    lang: "日本語",
    title: "🌸 ルール確認、参加案内、仲間探し",
    body: "Discordではサーバー情報、ルール、通報、クリップ、ボイス、イベント案内を確認できます。明るく楽しく参加してください。",
    style: "from-rose-400/25 via-pink-300/10 to-white/5"
  },
  {
    flag: "🇰🇷",
    lang: "한국어",
    title: "⚡ 규칙 확인, 서버 정보, 파티 모집",
    body: "Discord에서 서버 상태, 규칙, 신고, 클립, 보이스, 이벤트 안내를 확인할 수 있습니다. 밝고 친절하게 플레이해요.",
    style: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10"
  }
];

const partyChips = ["🦖 Pack hunt", "🎙 Voice lobby", "📸 Screenshots", "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4 languages", "🏁 Events", "🟢 Live status", "✨ Bright vibes", "😂 Funny moments"];

const channelGroups = [
  {
    title: "🚀 START HERE",
    color: "from-amber-300/30 via-orange-400/15 to-pink-400/15",
    channels: ["👋 #welcome", "📜 #rules", "📢 #announcements", "🟢 #server-status", "🎮 #how-to-join"]
  },
  {
    title: "🦖 COMMUNITY",
    color: "from-emerald-300/30 via-teal-300/15 to-cyan-400/15",
    channels: ["💬 #general-chat", "📸 #screenshots", "🎬 #clips-media", "🤝 #pack-recruitment"]
  },
  {
    title: "🛟 SUPPORT",
    color: "from-sky-300/30 via-blue-400/15 to-indigo-400/15",
    channels: ["🐞 #bug-report", "🚨 #player-report", "📝 #ban-appeal", "📩 #admin-contact"]
  },
  {
    title: "🎙 THE ISLE VOICE",
    color: "from-violet-300/30 via-fuchsia-400/15 to-rose-400/15",
    channels: ["🔊 Lobby", "🦕 Pack Room 1", "🦖 Pack Room 2", "🏁 Event Voice", "🛡 Staff Voice"]
  }
];

const pinnedMessages = [
  {
    title: "👋🌈 #welcome",
    body: "🇬🇧 Welcome to THE ISLE ASIA. Pick your language room, read rules, check status, then jump in. 🇲🇳 Тавтай морил, хэлний өрөөгөө сонгоод server-т орцгооё."
  },
  {
    title: "📜🛡 #rules",
    body: "🇯🇵 ルールを読んで、楽しく安全にプレイしましょう。 🇰🇷 규칙을 확인하고 친절하게 플레이해요. No drama, no exploit, no spam."
  },
  {
    title: "🟢📡 #server-status",
    body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore | 🎮 Server page: https://the-isle.vercel.app/server"
  },
  {
    title: "🎉🦖 #events",
    body: "Weekend growth, pack nights, screenshots, clips, and funny survival moments go here. Keep it bright, friendly, and fun."
  }
];

export default async function DiscordPage() {
  const discord = await getDiscordCommunity();

  return (
    <main className="min-h-screen overflow-hidden pt-24 pb-20">
      <section className="container relative py-12 sm:py-16">
        <div className="absolute left-4 top-8 -z-10 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute right-8 top-24 -z-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-72 -z-10 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />

        <div className="mb-6 flex flex-wrap gap-2">
          {partyChips.map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-white/[.07] px-3 py-2 text-xs font-bold text-zinc-100 shadow-lg shadow-black/20 backdrop-blur">
              {chip}
            </span>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[linear-gradient(90deg,rgba(45,212,191,.18),rgba(244,114,182,.14),rgba(251,191,36,.14))] px-4 py-2 text-xs font-bold uppercase text-primary shadow-[0_0_36px_rgba(45,212,191,.22)]">
              <Sparkles className="h-4 w-4" />
              🌈 Discord x Website x Server
            </div>
            <h1 className="text-gradient mt-6 max-w-4xl font-display text-5xl font-black leading-none sm:text-7xl">
              🦖 Bright Discord hub for JP, MNG, KR, and EN players
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">
              🇬🇧 🇲🇳 🇯🇵 🇰🇷 THE ISLE ASIA Discord is the fun room for language chat, server status, rules, reports, clips, pack recruitment, voice coordination, and website links.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 px-7 text-base shadow-[0_0_44px_rgba(45,212,191,.38)]">
                <a href={discord.invite}>
                  <MessageCircle className="h-5 w-5" />
                  🌈 Join Discord
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 border-cyan-300/30 bg-cyan-300/10 text-base hover:bg-cyan-300/15">
                <a href={siteConfig.discordGeneralChannel}>💬 Open General</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 border-amber-300/30 bg-amber-300/10 text-base hover:bg-amber-300/15">
                <Link href="/server">
                  <Gamepad2 className="h-5 w-5" />
                  🎮 Server Page
                </Link>
              </Button>
            </div>
          </div>

          <Card className="hud-card border-primary/30 bg-[linear-gradient(135deg,rgba(45,212,191,.16),rgba(244,114,182,.10),rgba(251,191,36,.10))] shadow-[0_0_70px_rgba(45,212,191,.18)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <RadioTower className="h-6 w-6 text-primary" />
                🟢 ASIA JP,MNG,KR Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["🛰 Address", "209.102.250.73:9075"],
                  ["🌏 Region", "Singapore"],
                  ["🌐 Website", "the-isle.vercel.app"],
                  ["💬 Discord ID", discord.serverId]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-white/10 bg-black/25 p-4 shadow-inner shadow-white/5">
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
          <h2 className="font-display text-3xl font-black">🇬🇧 🇲🇳 🇯🇵 🇰🇷 4-language Discord guide</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {multilingualGuides.map((guide) => (
            <Card key={guide.lang} className={`border-white/10 bg-gradient-to-br ${guide.style} shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-primary/40`}>
              <CardContent className="p-5">
                <div className="text-5xl">{guide.flag}</div>
                <div className="mt-4 text-xs font-black uppercase text-primary">{guide.lang}</div>
                <h3 className="mt-2 text-lg font-black text-white">{guide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{guide.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="mb-5 flex items-center gap-3">
          <Languages className="h-6 w-6 text-primary" />
          <h2 className="font-display text-3xl font-black">🌏 Language rooms</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {languageRooms.map((room) => (
            <Card key={room.channel} className={`border-white/10 bg-gradient-to-br ${room.style} shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-primary/10`}>
              <CardContent className="p-5">
                <div className="text-5xl drop-shadow-[0_0_24px_rgba(255,255,255,.18)]">{room.flag}</div>
                <h3 className="mt-4 text-xl font-black text-white">{room.name}</h3>
                <div className="mt-1 text-sm font-bold text-primary">{room.channel}</div>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{room.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="mb-5 flex items-center gap-3">
          <Users className="h-6 w-6 text-secondary" />
          <h2 className="font-display text-3xl font-black">🧩 Discord room plan</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {channelGroups.map((group) => (
            <Card key={group.title} className={`border-white/10 bg-gradient-to-br ${group.color} shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25`}>
              <CardContent className="p-5">
                <h3 className="font-display text-lg font-black text-white">{group.title}</h3>
                <div className="mt-4 space-y-2">
                  {group.channels.map((channel) => (
                    <div key={channel} className="rounded-md border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-100 shadow-inner shadow-white/5">
                      {channel}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="rounded-md border border-white/10 bg-[linear-gradient(90deg,rgba(34,211,238,.16),rgba(244,114,182,.14),rgba(251,191,36,.16),rgba(52,211,153,.14))] p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase text-primary">
                <Zap className="h-4 w-4" />
                🌈 Community mood
              </div>
              <p className="mt-2 text-xl font-black text-white">🇬🇧 Friendly / 🇲🇳 Найрсаг / 🇯🇵 明るい / 🇰🇷 친절하게</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-bold">
              {['🦕 friendly', '🎮 useful', '🌈 colorful', '📌 easy to pin', '😂 funny'].map((item) => (
                <span key={item} className="rounded-full bg-black/25 px-3 py-2 text-zinc-100">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container grid gap-5 py-10 lg:grid-cols-[.85fr_1.15fr]">
        <Card className="hud-card border-emerald-300/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              🛡 Staff online view
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 flex items-end gap-3">
              <div className="text-5xl font-black text-white">{discord.onlineModerators}</div>
              <div className="pb-2 text-sm font-bold text-muted-foreground">mods ready</div>
            </div>
            <div className="space-y-3">
              {discord.staff.map((member) => (
                <div key={member.name} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 p-3 transition hover:border-primary/30 hover:bg-primary/5">
                  <img src={member.avatar} alt="" className="h-10 w-10 rounded-md" />
                  <div>
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role} · {member.discord}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hud-card border-fuchsia-300/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-6 w-6 text-secondary" />
              📌 Page links to pin in Discord
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
                <Link key={href} href={href} className="rounded-md border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5">
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
          <h2 className="font-display text-3xl font-black">📌 Pinned message style</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pinnedMessages.map((message) => (
            <Card key={message.title} className="hud-card border-white/10 transition hover:-translate-y-1 hover:border-secondary/30">
              <CardContent className="p-5">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-black text-white">{message.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{message.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
