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
    content:
      "╭── 🌈🦖 **THE ISLE ASIA HUB** 🦖🌈 ──╮\n" +
      "✨ JP 🇯🇵 / MNG 🇲🇳 / KR 🇰🇷 / EN 🇬🇧 players welcome! ✨\n" +
      "🎮 Server info • 📜 Rules • 🎙 Voice • 🤝 Packs • 📸 Clips • 😂 Funny island moments\n" +
      "╰──────────────────────────────╯",
    embeds: [
      {
        title: "🟢🦕 ASIA JP,MNG,KR Test is the main island",
        description:
          "🌟 Bright Asia community for The Isle players.\n🤝 Be friendly. 📌 Read info. 🎮 Join the island. 😂 Enjoy the chaos.\n\n🛰 **Server:** `209.102.250.73:9075`\n🌏 **Region:** Singapore\n🌐 **Website:** https://the-isle.vercel.app/discord\n💬 **Open channel:** https://discord.com/channels/1536921178931859476/1536955772548681818",
        color: 0x22d3ee,
        fields: [
          { name: "🦖🤝 Pack hunt", value: "Solo? No problem. Find friends and survive together.", inline: true },
          { name: "🎙⚡ Voice lobby", value: "Fast calls for hunts, events, support, and panic moments.", inline: true },
          { name: "📸🎬 Media drops", value: "Screenshots, clips, wins, fails, and funny island proof.", inline: true }
        ],
        footer: { text: "THE ISLE ASIA • 明るく楽しく • Дүрмээ баримталъя • 재밌게 플레이" }
      }
    ]
  },
  {
    content: "📜⚠️ **READ FIRST / ЭХЛЭЭД УНШ / 最初に読んで / 먼저 읽기** ⚠️📜",
    embeds: [
      {
        title: "📜🛡 Server Rules / ルール / Дүрэм / 규칙",
        description:
          "✅ Simple. 🎯 Clear. 🌈 Friendly.\nRules keep the server fun, readable, and playable for everyone.",
        color: 0xf43f5e,
        fields: [
          { name: "1️⃣🤝 Respect everyone", value: "No harassment, hate speech, personal attacks, spam, or drama farming. Keep it chill.", inline: false },
          { name: "2️⃣🛡 Staff decision is final", value: "If staff asks you to stop, stop first. Appeals/questions go to support or admin contact.", inline: false },
          { name: "3️⃣🚫 Keep content clean", value: "No NSFW, shock content, scams, suspicious links, or ear-breaking audio. Your speakers deserve peace.", inline: false },
          { name: "4️⃣🎮 Fair play", value: "No combat logging, exploit abuse, cheating, impersonation, or bending rules for advantage.", inline: false },
          { name: "5️⃣📌 Use the right room", value: "🌏 Language chat for language talk • 🛟 support for problems • 📸 media for clips • 🟢 status for info.", inline: false }
        ]
      }
    ]
  },
  {
    content: "🌏💬 **LANGUAGE ROOMS - choose your home corner** 💬🌏",
    embeds: [
      {
        title: "🇬🇧 🇲🇳 🇯🇵 🇰🇷 Language Rooms",
        description:
          "Pick your room and say hi. New players, solo players, quiet players, loud players — all welcome.\n\n🇬🇧 **English** — global chat, help, event calls\n🇲🇳 **Монгол** — Монгол тоглогчдын чат, pack хайх\n🇯🇵 **日本語** — 日本語の案内、質問、雑談\n🇰🇷 **한국어** — 한국어 안내, 파티 모집, 질문",
        color: 0xa78bfa,
        fields: [
          { name: "✨🌈 Mood", value: "Friendly • colorful • useful • funny • no heavy drama", inline: true },
          { name: "📌🚀 First step", value: "Read rules → check status → join game → try not to become lunch.", inline: true },
          { name: "🤝🦕 Pack finder", value: "Use language rooms to find teammates and event buddies.", inline: false }
        ]
      }
    ]
  },
  {
    content: "🟢📡 **SERVER STATUS BOARD** 📡🟢",
    embeds: [
      {
        title: "🎮🦖 Jump Into The Island",
        description:
          "Pin this if players keep asking: 'server name?', 'IP?', 'where join?'\n\n🏷 **Name:** ASIA JP,MNG,KR Test\n🛰 **Address:** `209.102.250.73:9075`\n📍 **Location:** Singapore\n📊 **Live status page:** https://the-isle.vercel.app/server",
        color: 0x34d399,
        fields: [
          { name: "🎮🔎 How to join", value: "Open The Isle Evrima → search server name → join → survive.", inline: false },
          { name: "⚡📊 Live info", value: "Website keeps server status and player info easy to check.", inline: false },
          { name: "🦴 Mini mission", value: "Find food, find water, find friends. Maybe in that order.", inline: false }
        ]
      }
    ]
  },
  {
    content: "🛟👑 **HELP + STAFF INFO** 👑🛟",
    embeds: [
      {
        title: "🚨 Need help? Use the right support room",
        description:
          "Screenshots/clips help staff understand fast. Calm report = faster support.",
        color: 0x60a5fa,
        fields: [
          { name: "🐞🛠 Bug report", value: "Game/server issue, connection problem, weird behavior.", inline: true },
          { name: "🚨🧾 Player report", value: "Rule break, harassment, cheating suspicion. Evidence helps.", inline: true },
          { name: "📝🔓 Ban appeal", value: "Explain calmly. No rage essay required.", inline: true },
          { name: "📩👑 Admin contact", value: "Important server/community questions only.", inline: true }
        ],
        footer: { text: "Be chill • be clear • bring evidence • staff are people too" }
      }
    ]
  },
  {
    content: "📌🔗 **QUICK LINKS - pin this if useful** 🔗📌",
    embeds: [
      {
        title: "🎮🌐 Website x Discord x Server",
        description: "Everything important in one place. Fast for new players, clean for staff.",
        color: 0xfacc15,
        fields: [
          { name: "🎮🟢 Server", value: "https://the-isle.vercel.app/server", inline: true },
          { name: "📜🛡 Rules", value: "https://the-isle.vercel.app/rules", inline: true },
          { name: "🎙⚡ Voice", value: "https://the-isle.vercel.app/voice", inline: true },
          { name: "🦖📚 Dinosaurs", value: "https://the-isle.vercel.app/dinosaurs", inline: true },
          { name: "🗺📍 Map", value: "https://the-isle.vercel.app/map", inline: true },
          { name: "🏁🎉 Events", value: "https://the-isle.vercel.app/events", inline: true }
        ],
        footer: { text: "Save this post. Future you will thank present you." }
      }
    ]
  }
];

for (const message of messages) {
  await send(message);
}

console.log(`Posted ${messages.length} emoji-rich Discord hub messages to channel ${channelId}.`);
