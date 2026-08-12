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
    content: "🌈 **THE ISLE ASIA HUB** 🦖✨\nJP / MNG / KR / EN players, welcome to the island!",
    embeds: [
      {
        title: "🟢 ASIA JP,MNG,KR Test",
        description:
          "Bright, friendly, and easy to use community hub for The Isle Asia players.\n\n**Server:** `209.102.250.73:9075`\n**Region:** Singapore\n**Website:** https://the-isle.vercel.app/discord",
        color: 0x22d3ee,
        fields: [
          { name: "🦖 Pack hunt", value: "Find friends, make a pack, survive together.", inline: true },
          { name: "🎙 Voice", value: "Use voice rooms for fast coordination.", inline: true },
          { name: "📸 Media", value: "Drop screenshots, clips, and funny moments.", inline: true }
        ],
        footer: { text: "THE ISLE ASIA • 明るく、楽しく、ルールはしっかり" }
      }
    ]
  },
  {
    embeds: [
      {
        title: "🌏 Language Rooms",
        description:
          "Choose your room and say hi. New players are welcome.\n\n🇬🇧 **English** - global chat and help\n🇲🇳 **Монгол** - Монгол тоглогчдын чат\n🇯🇵 **日本語** - 日本語の案内と雑談\n🇰🇷 **한국어** - 한국어 안내와 파티 모집",
        color: 0xf472b6,
        fields: [
          { name: "✨ Mood", value: "Friendly, colorful, useful, funny.", inline: true },
          { name: "📌 First step", value: "Read rules, check server status, then join game.", inline: true }
        ]
      }
    ]
  },
  {
    content: "📌 **Quick Links**",
    embeds: [
      {
        title: "🎮 Website x Discord x Server",
        description: "Everything important in one place, clean and fast.",
        color: 0xfacc15,
        fields: [
          { name: "🎮 Server Page", value: "https://the-isle.vercel.app/server", inline: true },
          { name: "📜 Rules", value: "https://the-isle.vercel.app/rules", inline: true },
          { name: "🎙 Voice Guide", value: "https://the-isle.vercel.app/voice", inline: true },
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
