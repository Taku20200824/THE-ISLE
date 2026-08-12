"use client";

import Link from "next/link";
import { Gamepad2, Languages, MessageCircle, RadioTower, ShieldCheck, Sparkles, Star, Users, Volume2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import type { getDiscordCommunity } from "@/lib/integrations/discord";

type DiscordCommunity = Awaited<ReturnType<typeof getDiscordCommunity>>;

type MiniCard = {
  icon: string;
  title: string;
  body: string;
  tone: string;
};

type Copy = {
  chips: string[];
  badge: string;
  title: string;
  body: string;
  join: string;
  general: string;
  server: string;
  serverTitle: string;
  labels: [string, string, string, string];
  guideTitle: string;
  guides: MiniCard[];
  roomsTitle: string;
  rooms: MiniCard[];
  planTitle: string;
  moodLabel: string;
  moodText: string;
  moodTags: string[];
  staffTitle: string;
  modsReady: string;
  linksTitle: string;
  links: Array<[string, string, string]>;
  pinnedTitle: string;
  pins: MiniCard[];
};

const channelGroups = [
  {
    title: "🌈 START HERE",
    tone: "from-amber-300/30 via-orange-400/15 to-pink-400/15",
    channels: ["👋 #welcome", "📜 #rules", "📢 #announcements", "🟢 #server-status", "🎮 #how-to-join"]
  },
  {
    title: "🦖 COMMUNITY",
    tone: "from-emerald-300/30 via-teal-300/15 to-cyan-400/15",
    channels: ["💬 #general-chat", "🌏 #jp-mng-kr-chat", "📷 #screenshots", "🎬 #clips-media", "🤝 #pack-recruitment"]
  },
  {
    title: "🛟 SUPPORT",
    tone: "from-sky-300/30 via-blue-400/15 to-indigo-400/15",
    channels: ["🐞 #bug-report", "🚨 #player-report", "📝 #ban-appeal", "📩 #admin-contact"]
  },
  {
    title: "🎙 THE ISLE VOICE",
    tone: "from-violet-300/30 via-fuchsia-400/15 to-rose-400/15",
    channels: ["🔊 Lobby", "🦕 Pack Room 1", "🦖 Pack Room 2", "🏁 Event Voice", "🛡 Staff Voice"]
  }
];

const copies: Record<Locale, Copy> = {
  en: {
    chips: ["🦖 Pack hunt", "🎙 Voice lobby", "📸 Screenshots", "🌏 4 languages", "🏁 Events", "🟢 Live status", "✨ Bright vibes", "😂 Funny moments"],
    badge: "🌈 Discord x Website x Server",
    title: "🦖 Bright Discord hub for JP, MNG, KR, and EN players",
    body: "THE ISLE ASIA Discord connects language chat, server status, rules, reports, clips, pack recruitment, voice rooms, and website links in one friendly place.",
    join: "Join Discord",
    general: "Open General",
    server: "Server Page",
    serverTitle: "ASIA JP,MNG,KR Test",
    labels: ["Address", "Region", "Website", "Discord ID"],
    guideTitle: "4-language Discord guide",
    guides: [
      { icon: "🇬🇧", title: "English guide", body: "Join, read rules, check status, find packs, and follow events.", tone: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { icon: "🇲🇳", title: "Mongolian players", body: "Chat, ask for help, find packs, and follow server updates.", tone: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { icon: "🇯🇵", title: "Japanese support", body: "Check join guides, rules, events, and community chat.", tone: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { icon: "🇰🇷", title: "Korean community", body: "Ask questions, recruit parties, and check server information.", tone: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "Language rooms",
    rooms: [
      { icon: "💬", title: "#general-chat", body: "Global chat, quick help, event calls, and pack finder.", tone: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { icon: "🌏", title: "#jp-mng-kr-chat", body: "MNG / JP / KR / EN mixed language support room.", tone: "from-emerald-300/25 via-cyan-300/10 to-white/5" },
      { icon: "📷", title: "#screenshots", body: "Share clean screenshots, beautiful views, and funny moments.", tone: "from-fuchsia-300/25 via-pink-300/10 to-white/5" },
      { icon: "🤝", title: "#pack-recruitment", body: "Find a pack by language, dino, play time, and voice option.", tone: "from-amber-300/25 via-lime-300/10 to-white/5" }
    ],
    planTitle: "Discord room plan",
    moodLabel: "Community mood",
    moodText: "Friendly / Найрсаг / 明るい / 친절하게",
    moodTags: ["🦕 friendly", "🎮 useful", "🌈 colorful", "📌 easy to pin", "😂 funny"],
    staffTitle: "Staff online view",
    modsReady: "mods ready",
    linksTitle: "Page links to pin in Discord",
    links: [["🎮 Server", "/server", "IP, players, Singapore status"], ["🎙 Voice", "/voice", "TAKU Voice setup"], ["📜 Rules", "/rules", "Rules and reports"], ["🦖 Dinosaurs", "/dinosaurs", "Playable guide"], ["🗺 Map", "/map", "Gateway routes"], ["🏁 Events", "/events", "Weekly community nights"]],
    pinnedTitle: "Pinned message style",
    pins: [
      { icon: "👋", title: "#welcome", body: "Pick your language room, read rules, check status, then jump in.", tone: "from-cyan-300/20 to-emerald-300/10" },
      { icon: "📜", title: "#rules", body: "No drama, no exploit, no spam. Keep the island fun.", tone: "from-amber-300/20 to-orange-300/10" },
      { icon: "🟢", title: "#server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore", tone: "from-emerald-300/20 to-cyan-300/10" },
      { icon: "🎉", title: "#events", body: "Weekend growth, pack nights, clips, and funny moments.", tone: "from-fuchsia-300/20 to-pink-300/10" }
    ]
  },
  mn: {
    chips: ["🦖 Pack hunt", "🎙 Voice lobby", "📸 Зураг", "🌏 4 хэл", "🏁 Эвент", "🟢 Live status", "✨ Гоё vibe", "😂 Хөгжилтэй moment"],
    badge: "🌈 Discord x Website x Server",
    title: "🦖 JP, MNG, KR, EN тоглогчдын өнгөлөг Discord төв",
    body: "THE ISLE ASIA Discord дээр хэлний чат, server status, дүрэм, report, clip, pack хайлт, voice өрөө, website link бүгд нэг дор байна.",
    join: "Discord-д нэгдэх",
    general: "General нээх",
    server: "Сервер хуудас",
    serverTitle: "ASIA JP,MNG,KR Test",
    labels: ["Хаяг", "Бүс", "Website", "Discord ID"],
    guideTitle: "4 хэлтэй Discord заавар",
    guides: [
      { icon: "🇬🇧", title: "English guide", body: "Орох, дүрэм унших, status шалгах, pack олох, event дагах.", tone: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { icon: "🇲🇳", title: "Монгол тоглогчид", body: "Чатлах, тусламж авах, pack хайх, server update харах өрөө.", tone: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { icon: "🇯🇵", title: "Япон хэлний тусламж", body: "Орох заавар, дүрэм, event, community chat ашиглана.", tone: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { icon: "🇰🇷", title: "Солонгос community", body: "Асуулт асуух, party хайх, server мэдээлэл авах боломжтой.", tone: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "Хэлний өрөөнүүд",
    rooms: [
      { icon: "💬", title: "#general-chat", body: "Ерөнхий чат, хурдан тусламж, event, pack хайлт.", tone: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { icon: "🌏", title: "#jp-mng-kr-chat", body: "MNG / JP / KR / EN холимог хэлний тусламжийн өрөө.", tone: "from-emerald-300/25 via-cyan-300/10 to-white/5" },
      { icon: "📷", title: "#screenshots", body: "Гоё зураг, хөгжилтэй moment, island screenshot оруулах.", tone: "from-fuchsia-300/25 via-pink-300/10 to-white/5" },
      { icon: "🤝", title: "#pack-recruitment", body: "Хэл, dino, тоглох цаг, voice ашиглах эсэхээр pack олох.", tone: "from-amber-300/25 via-lime-300/10 to-white/5" }
    ],
    planTitle: "Discord өрөөний бүтэц",
    moodLabel: "Community mood",
    moodText: "Friendly / Найрсаг / 明るい / 친절하게",
    moodTags: ["🦕 найрсаг", "🎮 хэрэгтэй", "🌈 өнгөлөг", "📌 pin хийхэд амар", "😂 хөгжилтэй"],
    staffTitle: "Staff online харагдац",
    modsReady: "модератор бэлэн",
    linksTitle: "Discord дээр pin хийх page link-үүд",
    links: [["🎮 Сервер", "/server", "IP, player, Singapore status"], ["🎙 Voice", "/voice", "TAKU Voice тохиргоо"], ["📜 Дүрэм", "/rules", "Дүрэм болон report"], ["🦖 Динозавр", "/dinosaurs", "Тоглох guide"], ["🗺 Map", "/map", "Gateway route"], ["🏁 Эвент", "/events", "Долоо хоногийн event"]],
    pinnedTitle: "Pin message загвар",
    pins: [
      { icon: "👋", title: "#welcome", body: "Хэлний өрөөгөө сонгоод, дүрмээ уншаад, status шалгаад орцгооё.", tone: "from-cyan-300/20 to-emerald-300/10" },
      { icon: "📜", title: "#rules", body: "Drama, exploit, spam байхгүй. Server-ээ гоё байлгая.", tone: "from-amber-300/20 to-orange-300/10" },
      { icon: "🟢", title: "#server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore", tone: "from-emerald-300/20 to-cyan-300/10" },
      { icon: "🎉", title: "#events", body: "Weekend growth, pack night, clip, хөгжилтэй moment.", tone: "from-fuchsia-300/20 to-pink-300/10" }
    ]
  },
  ja: {
    chips: ["🦖 パック狩り", "🎙 ボイスロビー", "📸 スクショ", "🌏 4言語", "🏁 イベント", "🟢 ライブ状態", "✨ 明るい雰囲気", "😂 面白い瞬間"],
    badge: "🌈 Discord x Website x Server",
    title: "🦖 JP・MNG・KR・EN プレイヤー向けの明るい Discord ハブ",
    body: "THE ISLE ASIA Discord では、言語チャット、サーバー状態、ルール、通報、クリップ、仲間募集、ボイス部屋、サイトリンクをまとめて確認できます。",
    join: "Discord に参加",
    general: "General を開く",
    server: "サーバーページ",
    serverTitle: "ASIA JP,MNG,KR Test",
    labels: ["アドレス", "地域", "Website", "Discord ID"],
    guideTitle: "4言語 Discord ガイド",
    guides: [
      { icon: "🇬🇧", title: "English guide", body: "参加、ルール確認、状態確認、仲間探し、イベント確認ができます。", tone: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { icon: "🇲🇳", title: "モンゴル語プレイヤー", body: "モンゴル語でチャット、質問、仲間募集、サーバー情報確認。", tone: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { icon: "🇯🇵", title: "日本語サポート", body: "参加方法、ルール、イベント、コミュニティチャットを確認できます。", tone: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { icon: "🇰🇷", title: "韓国語コミュニティ", body: "韓国語で質問、パーティ募集、サーバー情報を確認できます。", tone: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "言語ルーム",
    rooms: [
      { icon: "💬", title: "#general-chat", body: "一般チャット、ヘルプ、イベント、仲間募集。", tone: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { icon: "🌏", title: "#jp-mng-kr-chat", body: "MNG / JP / KR / EN の多言語サポートルーム。", tone: "from-emerald-300/25 via-cyan-300/10 to-white/5" },
      { icon: "📷", title: "#screenshots", body: "スクショ、きれいな景色、面白い瞬間を投稿。", tone: "from-fuchsia-300/25 via-pink-300/10 to-white/5" },
      { icon: "🤝", title: "#pack-recruitment", body: "言語、恐竜、時間、ボイス有無で仲間募集。", tone: "from-amber-300/25 via-lime-300/10 to-white/5" }
    ],
    planTitle: "Discord ルーム構成",
    moodLabel: "Community mood",
    moodText: "Friendly / Найрсаг / 明るい / 친절하게",
    moodTags: ["🦕 フレンドリー", "🎮 便利", "🌈 カラフル", "📌 pinしやすい", "😂 楽しい"],
    staffTitle: "スタッフ状況",
    modsReady: "スタッフ対応可",
    linksTitle: "Discord に pin するページリンク",
    links: [["🎮 サーバー", "/server", "IP、人数、Singapore 状態"], ["🎙 Voice", "/voice", "TAKU Voice 設定"], ["📜 ルール", "/rules", "ルールと通報"], ["🦖 恐竜", "/dinosaurs", "プレイガイド"], ["🗺 Map", "/map", "Gateway ルート"], ["🏁 イベント", "/events", "週間イベント"]],
    pinnedTitle: "Pin メッセージ例",
    pins: [
      { icon: "👋", title: "#welcome", body: "言語ルームを選び、ルールと状態を確認して参加してください。", tone: "from-cyan-300/20 to-emerald-300/10" },
      { icon: "📜", title: "#rules", body: "Drama、exploit、spamは禁止。楽しく遊びましょう。", tone: "from-amber-300/20 to-orange-300/10" },
      { icon: "🟢", title: "#server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore", tone: "from-emerald-300/20 to-cyan-300/10" },
      { icon: "🎉", title: "#events", body: "Weekend growth、pack night、clip、楽しい瞬間。", tone: "from-fuchsia-300/20 to-pink-300/10" }
    ]
  },
  ko: {
    chips: ["🦖 팩 사냥", "🎙 보이스 로비", "📸 스크린샷", "🌏 4개 언어", "🏁 이벤트", "🟢 실시간 상태", "✨ 밝은 분위기", "😂 재미있는 순간"],
    badge: "🌈 Discord x Website x Server",
    title: "🦖 JP, MNG, KR, EN 플레이어를 위한 밝은 Discord 허브",
    body: "THE ISLE ASIA Discord에서는 언어 채팅, 서버 상태, 규칙, 신고, 클립, 파티 모집, 보이스 방, 웹사이트 링크를 한곳에서 확인할 수 있습니다.",
    join: "Discord 참여",
    general: "General 열기",
    server: "서버 페이지",
    serverTitle: "ASIA JP,MNG,KR Test",
    labels: ["주소", "지역", "Website", "Discord ID"],
    guideTitle: "4개 언어 Discord 가이드",
    guides: [
      { icon: "🇬🇧", title: "English guide", body: "접속, 규칙 확인, 상태 확인, 팩 찾기, 이벤트 확인.", tone: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { icon: "🇲🇳", title: "몽골어 플레이어", body: "몽골어 채팅, 도움 요청, 팩 모집, 서버 업데이트 확인.", tone: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { icon: "🇯🇵", title: "일본어 지원", body: "일본어 접속 안내, 규칙, 이벤트, 커뮤니티 채팅 확인.", tone: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { icon: "🇰🇷", title: "한국어 커뮤니티", body: "한국어 질문, 파티 모집, 서버 정보를 확인하세요.", tone: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "언어 방",
    rooms: [
      { icon: "💬", title: "#general-chat", body: "일반 채팅, 빠른 도움, 이벤트, 팩 모집.", tone: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { icon: "🌏", title: "#jp-mng-kr-chat", body: "MNG / JP / KR / EN 다국어 지원 방.", tone: "from-emerald-300/25 via-cyan-300/10 to-white/5" },
      { icon: "📷", title: "#screenshots", body: "스크린샷, 멋진 장면, 재미있는 순간을 공유하세요.", tone: "from-fuchsia-300/25 via-pink-300/10 to-white/5" },
      { icon: "🤝", title: "#pack-recruitment", body: "언어, 공룡, 시간, 보이스 여부로 팩을 찾으세요.", tone: "from-amber-300/25 via-lime-300/10 to-white/5" }
    ],
    planTitle: "Discord 방 구성",
    moodLabel: "Community mood",
    moodText: "Friendly / Найрсаг / 明るい / 친절하게",
    moodTags: ["🦕 친절", "🎮 유용", "🌈 컬러풀", "📌 pin 쉬움", "😂 재미"],
    staffTitle: "스태프 상태",
    modsReady: "스태프 대기",
    linksTitle: "Discord에 pin할 페이지 링크",
    links: [["🎮 서버", "/server", "IP, 인원, Singapore 상태"], ["🎙 Voice", "/voice", "TAKU Voice 설정"], ["📜 규칙", "/rules", "규칙과 신고"], ["🦖 공룡", "/dinosaurs", "플레이 가이드"], ["🗺 Map", "/map", "Gateway 경로"], ["🏁 이벤트", "/events", "주간 이벤트"]],
    pinnedTitle: "Pin 메시지 예시",
    pins: [
      { icon: "👋", title: "#welcome", body: "언어 방을 선택하고 규칙과 상태를 확인한 뒤 접속하세요.", tone: "from-cyan-300/20 to-emerald-300/10" },
      { icon: "📜", title: "#rules", body: "Drama, exploit, spam 금지. 즐겁게 플레이해요.", tone: "from-amber-300/20 to-orange-300/10" },
      { icon: "🟢", title: "#server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore", tone: "from-emerald-300/20 to-cyan-300/10" },
      { icon: "🎉", title: "#events", body: "Weekend growth, pack night, clip, 재미있는 순간.", tone: "from-fuchsia-300/20 to-pink-300/10" }
    ]
  }
};

export function DiscordPageContent({ discord }: { discord: DiscordCommunity }) {
  const { locale } = useLanguage();
  const copy = copies[locale];

  return (
    <main className="min-h-screen overflow-hidden pt-24 pb-20">
      <section className="container relative py-12 sm:py-16">
        <div className="mb-6 flex flex-wrap gap-2">
          {copy.chips.map((chip) => <span key={chip} className="rounded-full border border-white/10 bg-white/[.07] px-3 py-2 text-xs font-bold text-zinc-100 shadow-lg shadow-black/20 backdrop-blur">{chip}</span>)}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[linear-gradient(90deg,rgba(45,212,191,.18),rgba(244,114,182,.14),rgba(251,191,36,.14))] px-4 py-2 text-xs font-bold uppercase text-primary shadow-[0_0_36px_rgba(45,212,191,.22)]"><Sparkles className="h-4 w-4" />{copy.badge}</div>
            <h1 className="text-gradient mt-6 max-w-4xl font-display text-5xl font-black leading-none sm:text-7xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">{copy.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 px-7 text-base shadow-[0_0_44px_rgba(45,212,191,.38)]"><a href={discord.invite}><MessageCircle className="h-5 w-5" />{copy.join}</a></Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 border-cyan-300/30 bg-cyan-300/10 text-base hover:bg-cyan-300/15"><a href={siteConfig.discordGeneralChannel}>{copy.general}</a></Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 border-amber-300/30 bg-amber-300/10 text-base hover:bg-amber-300/15"><Link href="/server"><Gamepad2 className="h-5 w-5" />{copy.server}</Link></Button>
            </div>
          </div>

          <Card className="hud-card border-primary/30 bg-[linear-gradient(135deg,rgba(45,212,191,.16),rgba(244,114,182,.10),rgba(251,191,36,.10))] shadow-[0_0_70px_rgba(45,212,191,.18)]">
            <CardHeader><CardTitle className="flex items-center gap-2 text-2xl"><RadioTower className="h-6 w-6 text-primary" />🟢 {copy.serverTitle}</CardTitle></CardHeader>
            <CardContent><div className="grid gap-3 sm:grid-cols-2">{[[copy.labels[0], "209.102.250.73:9075"], [copy.labels[1], "Singapore"], [copy.labels[2], "the-isle.vercel.app"], [copy.labels[3], discord.serverId]].map(([label, value]) => <div key={label} className="rounded-md border border-white/10 bg-black/25 p-4 shadow-inner shadow-white/5"><div className="text-xs uppercase text-muted-foreground">{label}</div><div className="mt-1 break-words font-bold text-white">{value}</div></div>)}</div></CardContent>
          </Card>
        </div>
      </section>

      <CardGrid icon={<Languages className="h-6 w-6 text-primary" />} title={copy.guideTitle} items={copy.guides} />
      <CardGrid icon={<Languages className="h-6 w-6 text-primary" />} title={copy.roomsTitle} items={copy.rooms} />

      <section className="container py-10">
        <div className="mb-5 flex items-center gap-3"><Users className="h-6 w-6 text-secondary" /><h2 className="font-display text-3xl font-black">🧩 {copy.planTitle}</h2></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {channelGroups.map((group) => <Card key={group.title} className={`border-white/10 bg-gradient-to-br ${group.tone} shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25`}><CardContent className="p-5"><h3 className="font-display text-lg font-black text-white">{group.title}</h3><div className="mt-4 space-y-2">{group.channels.map((channel) => <div key={channel} className="rounded-md border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-100 shadow-inner shadow-white/5">{channel}</div>)}</div></CardContent></Card>)}
        </div>
      </section>

      <section className="container py-10"><div className="rounded-md border border-white/10 bg-[linear-gradient(90deg,rgba(34,211,238,.16),rgba(244,114,182,.14),rgba(251,191,36,.16),rgba(52,211,153,.14))] p-5 shadow-2xl shadow-black/20"><div className="flex flex-wrap items-center justify-between gap-4"><div><div className="flex items-center gap-2 text-sm font-bold uppercase text-primary"><Zap className="h-4 w-4" />{copy.moodLabel}</div><p className="mt-2 text-xl font-black text-white">{copy.moodText}</p></div><div className="flex flex-wrap gap-2 text-sm font-bold">{copy.moodTags.map((item) => <span key={item} className="rounded-full bg-black/25 px-3 py-2 text-zinc-100">{item}</span>)}</div></div></div></section>

      <section className="container grid gap-5 py-10 lg:grid-cols-[.85fr_1.15fr]">
        <Card className="hud-card border-emerald-300/20"><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary" />{copy.staffTitle}</CardTitle></CardHeader><CardContent><div className="mb-5 flex items-end gap-3"><div className="text-5xl font-black text-white">{discord.onlineModerators}</div><div className="pb-2 text-sm font-bold text-muted-foreground">{copy.modsReady}</div></div><div className="space-y-3">{discord.staff.map((member) => <div key={member.name} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 p-3 transition hover:border-primary/30 hover:bg-primary/5"><img src={member.avatar} alt="" className="h-10 w-10 rounded-md" /><div><div className="font-semibold text-white">{member.name}</div><div className="text-xs text-muted-foreground">{member.role} · {member.discord}</div></div></div>)}</div></CardContent></Card>
        <Card className="hud-card border-fuchsia-300/20"><CardHeader><CardTitle className="flex items-center gap-2"><Volume2 className="h-6 w-6 text-secondary" />{copy.linksTitle}</CardTitle></CardHeader><CardContent><div className="grid gap-3 md:grid-cols-3">{copy.links.map(([title, href, note]) => <Link key={href} href={href} className="rounded-md border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5"><div className="font-bold text-white">{title}</div><div className="mt-2 text-xs leading-5 text-muted-foreground">{note}</div></Link>)}</div></CardContent></Card>
      </section>

      <CardGrid icon={<MessageCircle className="h-6 w-6 text-primary" />} title={copy.pinnedTitle} items={copy.pins} star />
    </main>
  );
}

function CardGrid({ icon, title, items, star = false }: { icon: React.ReactNode; title: string; items: MiniCard[]; star?: boolean }) {
  return (
    <section className="container py-10">
      <div className="mb-5 flex items-center gap-3">{icon}<h2 className="font-display text-3xl font-black">{title}</h2></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => <Card key={`${title}-${item.title}`} className={`border-white/10 bg-gradient-to-br ${item.tone} shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-primary/40`}><CardContent className="p-5">{star ? <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10"><Star className="h-5 w-5 text-primary" /></div> : <div className="text-5xl">{item.icon}</div>}<h3 className="mt-4 text-lg font-black text-white">{item.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-300">{item.body}</p></CardContent></Card>)}
      </div>
    </section>
  );
}
