const token = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.DISCORD_CHANNEL_ID ?? "1536955772548681818";

if (!token) {
  throw new Error("Set DISCORD_BOT_TOKEN before running this script.");
}

const apiBase = "https://discord.com/api/v10";

async function discord(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${path} failed: ${response.status} ${JSON.stringify(data)}`);
  }

  return data;
}

async function send(payload) {
  return discord(`/channels/${channelId}/messages`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

const messages = [
  {
    content: "🌈✨ **WELCOME TO THE ISLE ASIA** ✨🌈\nJP / MNG / KR / EN players, this is the colorful hub for server info, rules, voice, packs, and funny island moments.",
    embeds: [
      {
        title: "🟢 ASIA JP,MNG,KR Test",
        description:
          "A bright Asia community for The Isle players. Keep it friendly, useful, and fun.\n\n**Server:** `209.102.250.73:9075`\n**Region:** Singapore\n**Website:** https://the-isle.vercel.app/discord\n**Open channel:** https://discord.com/channels/1536921178931859476/1536955772548681818",
        color: 0x22d3ee,
        fields: [
          { name: "🦖 Pack hunt", value: "Find friends, make a pack, survive together.", inline: true },
          { name: "🎙 Voice lobby", value: "Use voice rooms for fast calls and events.", inline: true },
          { name: "📸 Media drops", value: "Screenshots, clips, wins, fails, and funny moments.", inline: true }
        ],
        footer: { text: "THE ISLE ASIA • 明るく、楽しく、ルールはしっかり" }
      }
    ]
  },
  {
    embeds: [
      {
        title: "📜 Server Rules / ルール / Дүрэм / 규칙",
        description:
          "Official-style, simple, and easy to understand. Read before chatting or joining events.",
        color: 0xf43f5e,
        fields: [
          { name: "1️⃣ Respect everyone", value: "No harassment, hate speech, personal attacks, spam, or drama farming.", inline: false },
          { name: "2️⃣ Staff decision is final", value: "If staff asks you to stop, stop first. Appeals or questions go to support/admin contact.", inline: false },
          { name: "3️⃣ Keep content clean", value: "No NSFW, shock content, illegal content, scams, suspicious links, or ear-breaking audio.", inline: false },
          { name: "4️⃣ Game fair play", value: "No combat logging, exploit abuse, cheating, impersonation, or rule-bending for advantage.", inline: false },
          { name: "5️⃣ Use the right room", value: "Language chat for language talk, support for problems, media for clips, server-status for info.", inline: false }
        ]
      }
    ]
  },
  {
    embeds: [
      {
        title: "🌏 Language Rooms",
        description:
          "Pick your room and say hi. New players are welcome, solo players too.\n\n🇬🇧 **English** - global chat, help, event calls\n🇲🇳 **Монгол** - Монгол тоглогчдын чат, pack хайх\n🇯🇵 **日本語** - 日本語の案内、質問、雑談\n🇰🇷 **한국어** - 한국어 안내, 파티 모집, 질문",
        color: 0xa78bfa,
        fields: [
          { name: "✨ Mood", value: "Friendly, colorful, useful, funny.", inline: true },
          { name: "📌 First step", value: "Read rules, check status, then join the island.", inline: true }
        ]
      }
    ]
  },
  {
    embeds: [
      {
        title: "🟢 Server Status Board",
        description:
          "Pin this if you want players to find game info fast.\n\n**Name:** ASIA JP,MNG,KR Test\n**Address:** `209.102.250.73:9075`\n**Location:** Singapore\n**Status page:** https://the-isle.vercel.app/server",
        color: 0x34d399,
        fields: [
          { name: "🎮 How to join", value: "Open The Isle Evrima, search server name, or connect with the address above.", inline: false },
          { name: "⚡ Live info", value: "Website reads server status and keeps player info easy to check.", inline: false }
        ]
      }
    ]
  },
  {
    embeds: [
      {
        title: "🛟 Help + Staff Info",
        description:
          "Need help? Use the support rooms so staff can see it quickly.",
        color: 0x60a5fa,
        fields: [
          { name: "🐞 Bug report", value: "Game/server issue, connection problem, weird behavior.", inline: true },
          { name: "🚨 Player report", value: "Rule break, harassment, cheating suspicion.", inline: true },
          { name: "📝 Ban appeal", value: "Explain calmly. Screenshots or clips help.", inline: true },
          { name: "📩 Admin contact", value: "Important server/community questions only.", inline: true }
        ],
        footer: { text: "Common sense applies. Be chill, be clear, bring evidence." }
      }
    ]
  },
  {
    content: "📌 **Quick Links - pin me if useful**",
    embeds: [
      {
        title: "🎮 Website x Discord x Server",
        description: "Everything important in one place, clean and fast.",
        color: 0xfacc15,
        fields: [
          { name: "🎮 Server", value: "https://the-isle.vercel.app/server", inline: true },
          { name: "📜 Rules", value: "https://the-isle.vercel.app/rules", inline: true },
          { name: "🎙 Voice", value: "https://the-isle.vercel.app/voice", inline: true },
          { name: "🦖 Dinosaurs", value: "https://the-isle.vercel.app/dinosaurs", inline: true },
          { name: "🗺 Map", value: "https://the-isle.vercel.app/map", inline: true },
          { name: "🏁 Events", value: "https://the-isle.vercel.app/events", inline: true }
        ]
      }
    ]
  }
];

for (const message of messages) {
  await send(message);
}

console.log(`Posted ${messages.length} colorful Discord hub messages to channel ${channelId}.`);
