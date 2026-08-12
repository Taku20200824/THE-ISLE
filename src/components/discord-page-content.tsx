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

type DiscordCopy = {
  chips: string[];
  heroBadge: string;
  heroTitle: string;
  heroBody: string;
  joinButton: string;
  generalButton: string;
  serverButton: string;
  serverCardTitle: string;
  statLabels: string[];
  guideTitle: string;
  guides: Array<{ flag: string; lang: string; title: string; body: string; style: string }>;
  roomsTitle: string;
  rooms: Array<{ flag: string; name: string; channel: string; note: string; style: string }>;
  planTitle: string;
  groups: Array<{ title: string; color: string; channels: string[] }>;
  moodLabel: string;
  moodText: string;
  moodTags: string[];
  staffTitle: string;
  modsReady: string;
  linksTitle: string;
  links: Array<[string, string, string]>;
  pinnedTitle: string;
  pinnedMessages: Array<{ title: string; body: string }>;
};

const groupColors = [
  "from-amber-300/30 via-orange-400/15 to-pink-400/15",
  "from-emerald-300/30 via-teal-300/15 to-cyan-400/15",
  "from-sky-300/30 via-blue-400/15 to-indigo-400/15",
  "from-violet-300/30 via-fuchsia-400/15 to-rose-400/15"
];

const sharedChannels = {
  start: ["👋 #welcome", "📜 #rules", "📢 #announcements", "🟢 #server-status", "🎮 #how-to-join"],
  community: ["💬 #general-chat", "🌏 #jp-mng-kr-chat", "📷 #screenshots", "🎬 #clips-media", "🤝 #pack-recruitment"],
  support: ["🐞 #bug-report", "🚨 #player-report", "📝 #ban-appeal", "📩 #admin-contact"],
  voice: ["🔊 Lobby", "🦕 Pack Room 1", "🦖 Pack Room 2", "🏁 Event Voice", "🛡 Staff Voice"]
};

const copies: Record<Locale, DiscordCopy> = {
  en: {
    chips: ["🦖 Pack hunt", "🎙 Voice lobby", "📸 Screenshots", "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4 languages", "🏁 Events", "🟢 Live status", "✨ Bright vibes", "😂 Funny moments"],
    heroBadge: "🌈 Discord x Website x Server",
    heroTitle: "🦖 Bright Discord hub for JP, MNG, KR, and EN players",
    heroBody: "THE ISLE ASIA Discord connects language chat, server status, rules, reports, clips, pack recruitment, voice rooms, and website links in one friendly place.",
    joinButton: "🌈 Join Discord",
    generalButton: "💬 Open General",
    serverButton: "🎮 Server Page",
    serverCardTitle: "🟢 ASIA JP,MNG,KR Test",
    statLabels: ["🛰 Address", "🌏 Region", "🌐 Website", "💬 Discord ID"],
    guideTitle: "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4-language Discord guide",
    guides: [
      { flag: "🇬🇧", lang: "English", title: "🎮 Join, read rules, find a pack", body: "Use Discord for status, rules, reports, clips, voice rooms, and event calls. Keep chat friendly and useful.", style: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", lang: "Монгол", title: "🦖 Mongolian players welcome", body: "MNG players can chat, ask for help, find packs, and follow server updates here.", style: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", lang: "日本語", title: "🌸 Japanese support room", body: "Japanese players can check join guides, rules, events, and community chat.", style: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", lang: "한국어", title: "⚡ Korean community", body: "Korean players can ask questions, recruit packs, and follow server information.", style: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "🌏 Language rooms",
    rooms: [
      { flag: "🇬🇧", name: "English", channel: "#general-chat", note: "🎮 Global chat, quick help, event calls, pack finder", style: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", name: "Монгол", channel: "#jp-mng-kr-chat", note: "🦖 Mongolian chat, pack search, joining help", style: "from-blue-400/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", name: "日本語", channel: "#jp-mng-kr-chat", note: "🌸 Japanese questions, join guide, chat, events", style: "from-rose-300/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", name: "한국어", channel: "#jp-mng-kr-chat", note: "⚡ Korean guide, party recruitment, server info", style: "from-indigo-300/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    planTitle: "🧩 Discord room plan",
    groups: [
      { title: "🚀 START HERE", color: groupColors[0], channels: sharedChannels.start },
      { title: "🦖 COMMUNITY", color: groupColors[1], channels: sharedChannels.community },
      { title: "🛟 SUPPORT", color: groupColors[2], channels: sharedChannels.support },
      { title: "🎙 THE ISLE VOICE", color: groupColors[3], channels: sharedChannels.voice }
    ],
    moodLabel: "🌈 Community mood",
    moodText: "🇬🇧 Friendly / 🇲🇳 Найрсаг / 🇯🇵 明るい / 🇰🇷 친절하게",
    moodTags: ["🦕 friendly", "🎮 useful", "🌈 colorful", "📌 easy to pin", "😂 funny"],
    staffTitle: "🛡 Staff online view",
    modsReady: "mods ready",
    linksTitle: "📌 Page links to pin in Discord",
    links: [["🎮 Server", "/server", "IP, players, Singapore status"], ["🎙 Voice", "/voice", "TAKU Voice setup"], ["📜 Rules", "/rules", "Rules and reports"], ["🦖 Dinosaurs", "/dinosaurs", "Playable guide"], ["🗺 Map", "/map", "Gateway routes"], ["🏁 Events", "/events", "Weekly community nights"]],
    pinnedTitle: "📌 Pinned message style",
    pinnedMessages: [
      { title: "👋🌈 #welcome", body: "Welcome to THE ISLE ASIA. Pick your language room, read rules, check status, then jump in." },
      { title: "📜🛡 #rules", body: "Read the rules and keep the server fun: no drama, no exploit, no spam." },
      { title: "🟢📡 #server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore | Server page: https://the-isle.vercel.app/server" },
      { title: "🎉🦖 #events", body: "Weekend growth, pack nights, screenshots, clips, and funny survival moments go here." }
    ]
  },
  mn: {
    chips: ["🦖 Pack hunt", "🎙 Voice lobby", "📸 Зураг", "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4 хэл", "🏁 Эвент", "🟢 Live status", "✨ Гоё vibe", "😂 Хөгжилтэй moment"],
    heroBadge: "🌈 Discord x Website x Server",
    heroTitle: "🦖 JP, MNG, KR, EN тоглогчдын өнгөлөг Discord төв",
    heroBody: "THE ISLE ASIA Discord дээр хэлний чат, server status, дүрэм, report, clip, pack хайлт, voice өрөө, website link бүгд нэг дор байна.",
    joinButton: "🌈 Discord-д нэгдэх",
    generalButton: "💬 General нээх",
    serverButton: "🎮 Сервер хуудас",
    serverCardTitle: "🟢 ASIA JP,MNG,KR Test",
    statLabels: ["🛰 Хаяг", "🌏 Бүс", "🌐 Website", "💬 Discord ID"],
    guideTitle: "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4 хэлтэй Discord заавар",
    guides: [
      { flag: "🇬🇧", lang: "English", title: "🎮 Орох, дүрэм унших, pack олох", body: "Status, дүрэм, report, clip, voice room, event дуудлага бүгд Discord дээр байна.", style: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", lang: "Монгол", title: "🦖 Монгол тоглогчдын өрөө", body: "Монгол тоглогчид чатлах, тусламж авах, pack хайх, server update харах боломжтой.", style: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", lang: "日本語", title: "🌸 Япон хэлний тусламж", body: "Япон тоглогчид орох заавар, дүрэм, event, community chat ашиглана.", style: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", lang: "한국어", title: "⚡ Солонгос community", body: "Солонгос тоглогчид асуулт асуух, party хайх, server мэдээлэл авах боломжтой.", style: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "🌏 Хэлний өрөөнүүд",
    rooms: [
      { flag: "🇬🇧", name: "English", channel: "#general-chat", note: "🎮 Ерөнхий чат, хурдан тусламж, event, pack хайлт", style: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", name: "Монгол", channel: "#jp-mng-kr-chat", note: "🦖 Монгол чат, pack хайх, server-т орох тусламж", style: "from-blue-400/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", name: "日本語", channel: "#jp-mng-kr-chat", note: "🌸 Япон хэлний асуулт, орох заавар, эвент", style: "from-rose-300/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", name: "한국어", channel: "#jp-mng-kr-chat", note: "⚡ Солонгос заавар, party хайлт, server info", style: "from-indigo-300/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    planTitle: "🧩 Discord өрөөний бүтэц",
    groups: [
      { title: "🚀 ЭХЛЭХ", color: groupColors[0], channels: sharedChannels.start },
      { title: "🦖 COMMUNITY", color: groupColors[1], channels: sharedChannels.community },
      { title: "🛟 SUPPORT", color: groupColors[2], channels: sharedChannels.support },
      { title: "🎙 THE ISLE VOICE", color: groupColors[3], channels: sharedChannels.voice }
    ],
    moodLabel: "🌈 Community mood",
    moodText: "🇬🇧 Friendly / 🇲🇳 Найрсаг / 🇯🇵 明るい / 🇰🇷 친절하게",
    moodTags: ["🦕 найрсаг", "🎮 хэрэгтэй", "🌈 өнгөлөг", "📌 pin хийхэд амар", "😂 хөгжилтэй"],
    staffTitle: "🛡 Staff online харагдац",
    modsReady: "модератор бэлэн",
    linksTitle: "📌 Discord дээр pin хийх page link-үүд",
    links: [["🎮 Сервер", "/server", "IP, player, Singapore status"], ["🎙 Voice", "/voice", "TAKU Voice тохиргоо"], ["📜 Дүрэм", "/rules", "Дүрэм болон report"], ["🦖 Динозавр", "/dinosaurs", "Тоглох guide"], ["🗺 Map", "/map", "Gateway route"], ["🏁 Эвент", "/events", "Долоо хоногийн event"]],
    pinnedTitle: "📌 Pin message загвар",
    pinnedMessages: [
      { title: "👋🌈 #welcome", body: "THE ISLE ASIA-д тавтай морил. Хэлний өрөөгөө сонгоод, дүрмээ уншаад, status шалгаад орцгооё." },
      { title: "📜🛡 #rules", body: "Дүрмээ уншаад server-ээ хөгжилтэй байлгая: drama, exploit, spam байхгүй." },
      { title: "🟢📡 #server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore | Server page: https://the-isle.vercel.app/server" },
      { title: "🎉🦖 #events", body: "Weekend growth, pack night, screenshot, clip, хөгжилтэй survival moment энд орно." }
    ]
  },
  ja: {
    chips: ["🦖 パック狩り", "🎙 ボイスロビー", "📸 スクショ", "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4言語", "🏁 イベント", "🟢 ライブ状態", "✨ 明るい雰囲気", "😂 面白い瞬間"],
    heroBadge: "🌈 Discord x Website x Server",
    heroTitle: "🦖 JP・MNG・KR・EN プレイヤー向けの明るい Discord ハブ",
    heroBody: "THE ISLE ASIA Discord では、言語チャット、サーバー状態、ルール、通報、クリップ、仲間募集、ボイス部屋、サイトリンクをまとめて確認できます。",
    joinButton: "🌈 Discord に参加",
    generalButton: "💬 General を開く",
    serverButton: "🎮 サーバーページ",
    serverCardTitle: "🟢 ASIA JP,MNG,KR Test",
    statLabels: ["🛰 アドレス", "🌏 地域", "🌐 Website", "💬 Discord ID"],
    guideTitle: "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4言語 Discord ガイド",
    guides: [
      { flag: "🇬🇧", lang: "English", title: "🎮 参加・ルール確認・仲間探し", body: "状態、ルール、通報、クリップ、ボイス部屋、イベント連絡を Discord で確認できます。", style: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", lang: "Монгол", title: "🦖 モンゴル語プレイヤー歓迎", body: "モンゴル語でチャット、質問、仲間募集、サーバー情報の確認ができます。", style: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", lang: "日本語", title: "🌸 日本語サポート", body: "参加方法、ルール、イベント、コミュニティチャットを日本語で確認できます。", style: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", lang: "한국어", title: "⚡ 韓国語コミュニティ", body: "韓国語で質問、パーティ募集、サーバー情報を確認できます。", style: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "🌏 言語ルーム",
    rooms: [
      { flag: "🇬🇧", name: "English", channel: "#general-chat", note: "🎮 一般チャット、ヘルプ、イベント、仲間募集", style: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", name: "Монгол", channel: "#jp-mng-kr-chat", note: "🦖 モンゴル語チャット、仲間募集、参加サポート", style: "from-blue-400/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", name: "日本語", channel: "#jp-mng-kr-chat", note: "🌸 日本語の質問、参加方法、イベント", style: "from-rose-300/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", name: "한국어", channel: "#jp-mng-kr-chat", note: "⚡ 韓国語ガイド、パーティ募集、サーバー情報", style: "from-indigo-300/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    planTitle: "🧩 Discord ルーム構成",
    groups: [
      { title: "🚀 START HERE", color: groupColors[0], channels: sharedChannels.start },
      { title: "🦖 COMMUNITY", color: groupColors[1], channels: sharedChannels.community },
      { title: "🛟 SUPPORT", color: groupColors[2], channels: sharedChannels.support },
      { title: "🎙 THE ISLE VOICE", color: groupColors[3], channels: sharedChannels.voice }
    ],
    moodLabel: "🌈 Community mood",
    moodText: "🇬🇧 Friendly / 🇲🇳 Найрсаг / 🇯🇵 明るい / 🇰🇷 친절하게",
    moodTags: ["🦕 フレンドリー", "🎮 便利", "🌈 カラフル", "📌 pinしやすい", "😂 楽しい"],
    staffTitle: "🛡 スタッフ状況",
    modsReady: "スタッフ対応可",
    linksTitle: "📌 Discord に pin するページリンク",
    links: [["🎮 サーバー", "/server", "IP、人数、Singapore 状態"], ["🎙 Voice", "/voice", "TAKU Voice 設定"], ["📜 ルール", "/rules", "ルールと通報"], ["🦖 恐竜", "/dinosaurs", "プレイガイド"], ["🗺 Map", "/map", "Gateway ルート"], ["🏁 イベント", "/events", "週間イベント"]],
    pinnedTitle: "📌 Pin メッセージ例",
    pinnedMessages: [
      { title: "👋🌈 #welcome", body: "THE ISLE ASIAへようこそ。言語ルームを選び、ルールと状態を確認して参加してください。" },
      { title: "📜🛡 #rules", body: "ルールを読んで楽しく遊びましょう。Drama、exploit、spamは禁止です。" },
      { title: "🟢📡 #server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore | Server page: https://the-isle.vercel.app/server" },
      { title: "🎉🦖 #events", body: "Weekend growth、pack night、スクショ、クリップ、楽しい survival moment を投稿できます。" }
    ]
  },
  ko: {
    chips: ["🦖 팩 사냥", "🎙 보이스 로비", "📸 스크린샷", "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4개 언어", "🏁 이벤트", "🟢 실시간 상태", "✨ 밝은 분위기", "😂 재미있는 순간"],
    heroBadge: "🌈 Discord x Website x Server",
    heroTitle: "🦖 JP, MNG, KR, EN 플레이어를 위한 밝은 Discord 허브",
    heroBody: "THE ISLE ASIA Discord에서는 언어 채팅, 서버 상태, 규칙, 신고, 클립, 파티 모집, 보이스 방, 웹사이트 링크를 한곳에서 확인할 수 있습니다.",
    joinButton: "🌈 Discord 참여",
    generalButton: "💬 General 열기",
    serverButton: "🎮 서버 페이지",
    serverCardTitle: "🟢 ASIA JP,MNG,KR Test",
    statLabels: ["🛰 주소", "🌏 지역", "🌐 Website", "💬 Discord ID"],
    guideTitle: "🇬🇧 🇲🇳 🇯🇵 🇰🇷 4개 언어 Discord 가이드",
    guides: [
      { flag: "🇬🇧", lang: "English", title: "🎮 접속, 규칙 확인, 팩 찾기", body: "상태, 규칙, 신고, 클립, 보이스 방, 이벤트 안내를 Discord에서 확인하세요.", style: "from-sky-400/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", lang: "Монгол", title: "🦖 몽골어 플레이어 환영", body: "몽골어로 채팅, 도움 요청, 팩 모집, 서버 업데이트 확인이 가능합니다.", style: "from-blue-500/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", lang: "日本語", title: "🌸 일본어 지원", body: "일본어로 접속 안내, 규칙, 이벤트, 커뮤니티 채팅을 확인할 수 있습니다.", style: "from-rose-400/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", lang: "한국어", title: "⚡ 한국어 커뮤니티", body: "한국어 질문, 파티 모집, 서버 정보를 편하게 확인하세요.", style: "from-indigo-400/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    roomsTitle: "🌏 언어 방",
    rooms: [
      { flag: "🇬🇧", name: "English", channel: "#general-chat", note: "🎮 일반 채팅, 빠른 도움, 이벤트, 팩 모집", style: "from-sky-300/25 via-cyan-300/10 to-white/5" },
      { flag: "🇲🇳", name: "Монгол", channel: "#jp-mng-kr-chat", note: "🦖 몽골어 채팅, 팩 찾기, 접속 도움", style: "from-blue-400/25 via-red-400/10 to-yellow-300/10" },
      { flag: "🇯🇵", name: "日本語", channel: "#jp-mng-kr-chat", note: "🌸 일본어 질문, 접속 안내, 이벤트", style: "from-rose-300/25 via-pink-300/10 to-white/5" },
      { flag: "🇰🇷", name: "한국어", channel: "#jp-mng-kr-chat", note: "⚡ 한국어 안내, 파티 모집, 서버 정보", style: "from-indigo-300/25 via-fuchsia-300/10 to-cyan-300/10" }
    ],
    planTitle: "🧩 Discord 방 구성",
    groups: [
      { title: "🚀 START HERE", color: groupColors[0], channels: sharedChannels.start },
      { title: "🦖 COMMUNITY", color: groupColors[1], channels: sharedChannels.community },
      { title: "🛟 SUPPORT", color: groupColors[2], channels: sharedChannels.support },
      { title: "🎙 THE ISLE VOICE", color: groupColors[3], channels: sharedChannels.voice }
    ],
    moodLabel: "🌈 Community mood",
    moodText: "🇬🇧 Friendly / 🇲🇳 Найрсаг / 🇯🇵 明るい / 🇰🇷 친절하게",
    moodTags: ["🦕 친절", "🎮 유용", "🌈 컬러풀", "📌 pin 쉬움", "😂 재미"],
    staffTitle: "🛡 스태프 상태",
    modsReady: "스태프 대기",
    linksTitle: "📌 Discord에 pin할 페이지 링크",
    links: [["🎮 서버", "/server", "IP, 인원, Singapore 상태"], ["🎙 Voice", "/voice", "TAKU Voice 설정"], ["📜 규칙", "/rules", "규칙과 신고"], ["🦖 공룡", "/dinosaurs", "플레이 가이드"], ["🗺 Map", "/map", "Gateway 경로"], ["🏁 이벤트", "/events", "주간 이벤트"]],
    pinnedTitle: "📌 Pin 메시지 예시",
    pinnedMessages: [
      { title: "👋🌈 #welcome", body: "THE ISLE ASIA에 오신 것을 환영합니다. 언어 방을 선택하고 규칙과 상태를 확인한 뒤 접속하세요." },
      { title: "📜🛡 #rules", body: "규칙을 읽고 즐겁게 플레이해요. Drama, exploit, spam은 금지입니다." },
      { title: "🟢📡 #server-status", body: "ASIA JP,MNG,KR Test | 209.102.250.73:9075 | Singapore | Server page: https://the-isle.vercel.app/server" },
      { title: "🎉🦖 #events", body: "Weekend growth, pack night, screenshots, clips, funny survival moments를 올려주세요." }
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
          {copy.chips.map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-white/[.07] px-3 py-2 text-xs font-bold text-zinc-100 shadow-lg shadow-black/20 backdrop-blur">{chip}</span>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[linear-gradient(90deg,rgba(45,212,191,.18),rgba(244,114,182,.14),rgba(251,191,36,.14))] px-4 py-2 text-xs font-bold uppercase text-primary shadow-[0_0_36px_rgba(45,212,191,.22)]"><Sparkles className="h-4 w-4" />{copy.heroBadge}</div>
            <h1 className="text-gradient mt-6 max-w-4xl font-display text-5xl font-black leading-none sm:text-7xl">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">{copy.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-14 px-7 text-base shadow-[0_0_44px_rgba(45,212,191,.38)]"><a href={discord.invite}><MessageCircle className="h-5 w-5" />{copy.joinButton}</a></Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 border-cyan-300/30 bg-cyan-300/10 text-base hover:bg-cyan-300/15"><a href={siteConfig.discordGeneralChannel}>{copy.generalButton}</a></Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-7 border-amber-300/30 bg-amber-300/10 text-base hover:bg-amber-300/15"><Link href="/server"><Gamepad2 className="h-5 w-5" />{copy.serverButton}</Link></Button>
            </div>
          </div>

          <Card className="hud-card border-primary/30 bg-[linear-gradient(135deg,rgba(45,212,191,.16),rgba(244,114,182,.10),rgba(251,191,36,.10))] shadow-[0_0_70px_rgba(45,212,191,.18)]">
            <CardHeader><CardTitle className="flex items-center gap-2 text-2xl"><RadioTower className="h-6 w-6 text-primary" />{copy.serverCardTitle}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {[[copy.statLabels[0], "209.102.250.73:9075"], [copy.statLabels[1], "Singapore"], [copy.statLabels[2], "the-isle.vercel.app"], [copy.statLabels[3], discord.serverId]].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-white/10 bg-black/25 p-4 shadow-inner shadow-white/5"><div className="text-xs uppercase text-muted-foreground">{label}</div><div className="mt-1 break-words font-bold text-white">{value}</div></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <DiscordCardGrid icon={<Languages className="h-6 w-6 text-primary" />} title={copy.guideTitle} items={copy.guides} />
      <DiscordCardGrid icon={<Languages className="h-6 w-6 text-primary" />} title={copy.roomsTitle} items={copy.rooms} room />

      <section className="container py-10">
        <div className="mb-5 flex items-center gap-3"><Users className="h-6 w-6 text-secondary" /><h2 className="font-display text-3xl font-black">{copy.planTitle}</h2></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.groups.map((group) => (
            <Card key={group.title} className={`border-white/10 bg-gradient-to-br ${group.color} shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25`}>
              <CardContent className="p-5"><h3 className="font-display text-lg font-black text-white">{group.title}</h3><div className="mt-4 space-y-2">{group.channels.map((channel) => <div key={channel} className="rounded-md border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-zinc-100 shadow-inner shadow-white/5">{channel}</div>)}</div></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-10"><div className="rounded-md border border-white/10 bg-[linear-gradient(90deg,rgba(34,211,238,.16),rgba(244,114,182,.14),rgba(251,191,36,.16),rgba(52,211,153,.14))] p-5 shadow-2xl shadow-black/20"><div className="flex flex-wrap items-center justify-between gap-4"><div><div className="flex items-center gap-2 text-sm font-bold uppercase text-primary"><Zap className="h-4 w-4" />{copy.moodLabel}</div><p className="mt-2 text-xl font-black text-white">{copy.moodText}</p></div><div className="flex flex-wrap gap-2 text-sm font-bold">{copy.moodTags.map((item) => <span key={item} className="rounded-full bg-black/25 px-3 py-2 text-zinc-100">{item}</span>)}</div></div></div></section>

      <section className="container grid gap-5 py-10 lg:grid-cols-[.85fr_1.15fr]">
        <Card className="hud-card border-emerald-300/20"><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary" />{copy.staffTitle}</CardTitle></CardHeader><CardContent><div className="mb-5 flex items-end gap-3"><div className="text-5xl font-black text-white">{discord.onlineModerators}</div><div className="pb-2 text-sm font-bold text-muted-foreground">{copy.modsReady}</div></div><div className="space-y-3">{discord.staff.map((member) => <div key={member.name} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/25 p-3 transition hover:border-primary/30 hover:bg-primary/5"><img src={member.avatar} alt="" className="h-10 w-10 rounded-md" /><div><div className="font-semibold text-white">{member.name}</div><div className="text-xs text-muted-foreground">{member.role} · {member.discord}</div></div></div>)}</div></CardContent></Card>
        <Card className="hud-card border-fuchsia-300/20"><CardHeader><CardTitle className="flex items-center gap-2"><Volume2 className="h-6 w-6 text-secondary" />{copy.linksTitle}</CardTitle></CardHeader><CardContent><div className="grid gap-3 md:grid-cols-3">{copy.links.map(([title, href, note]) => <Link key={href} href={href} className="rounded-md border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5"><div className="font-bold text-white">{title}</div><div className="mt-2 text-xs leading-5 text-muted-foreground">{note}</div></Link>)}</div></CardContent></Card>
      </section>

      <section className="container py-10"><div className="mb-5 flex items-center gap-3"><MessageCircle className="h-6 w-6 text-primary" /><h2 className="font-display text-3xl font-black">{copy.pinnedTitle}</h2></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{copy.pinnedMessages.map((message) => <Card key={message.title} className="hud-card border-white/10 transition hover:-translate-y-1 hover:border-secondary/30"><CardContent className="p-5"><div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10"><Star className="h-5 w-5 text-primary" /></div><h3 className="font-display text-xl font-black text-white">{message.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{message.body}</p></CardContent></Card>)}</div></section>
    </main>
  );
}

function DiscordCardGrid({ icon, title, items, room = false }: { icon: React.ReactNode; title: string; items: DiscordCopy["guides"]; room?: boolean }) {
  return (
    <section className="container py-10">
      <div className="mb-5 flex items-center gap-3">{icon}<h2 className="font-display text-3xl font-black">{title}</h2></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Card key={`${item.lang}-${item.title}`} className={`border-white/10 bg-gradient-to-br ${item.style} shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-primary/40`}>
            <CardContent className="p-5"><div className="text-5xl">{item.flag}</div><div className="mt-4 text-xs font-black uppercase text-primary">{item.lang}</div><h3 className="mt-2 text-lg font-black text-white">{room && "channel" in item ? item.channel : item.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-300">{room && "note" in item ? item.note : item.body}</p></CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
