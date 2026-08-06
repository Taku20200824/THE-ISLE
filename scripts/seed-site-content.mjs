import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID || "taku-f8db6";
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!getApps().length) {
  if (clientEmail && privateKey) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId
    });
  } else {
    initializeApp({ projectId });
  }
}

const db = getFirestore();

const dinosaurImages = {
  carnotaurus: "https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?auto=format&fit=crop&w=1600&q=85",
  ceratosaurus: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1600&q=85",
  deinosuchus: "https://images.unsplash.com/photo-1614065613125-17553fbc59f6?auto=format&fit=crop&w=1600&q=85",
  dilophosaurus: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=85",
  herrerasaurus: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85",
  omniraptor: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85",
  pteranodon: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
  stegosaurus: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=85",
  tenontosaurus: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1600&q=85",
  dryosaurus: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85",
  gallimimus: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=85",
  beipiaosaurus: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=85",
  hypsilophodon: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1600&q=85",
  pachycephalosaurus: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=85",
  diabloceratops: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1600&q=85",
  maiasaura: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85",
  troodon: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
  triceratops: "https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?auto=format&fit=crop&w=1600&q=85",
  tyrannosaurus: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1600&q=85",
  allosaurus: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=85",
  baryonyx: "https://images.unsplash.com/photo-1614065613125-17553fbc59f6?auto=format&fit=crop&w=1600&q=85",
  kentrosaurus: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=85",
  austroraptor: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85"
};

const dinosaurs = [
  ["carnotaurus", "Carnotaurus", "Carnivore", "2h 15m", "Fastest land carnivore with explosive charge pressure.", "Poor turning and fragile in long fights.", "Scout open ground, isolate wounded targets, then disengage before packs surround you.", "Speed ambusher", "Intermediate", "Playable"],
  ["ceratosaurus", "Ceratosaurus", "Carnivore", "2h 40m", "Bacterial bite pressure, corpse control, and strong bully potential.", "Can be overwhelmed by coordinated larger predators.", "Win through attrition, punish mistakes, and keep fights near food pressure.", "Corpse controller", "Intermediate", "Playable"],
  ["deinosuchus", "Deinosuchus", "Carnivore", "5h 30m", "Water ambush dominance and river control.", "Slow on land and predictable around water territory.", "Control crossings, remain patient, and let thirsty prey make the first mistake.", "Aquatic apex", "Advanced", "Playable"],
  ["dilophosaurus", "Dilophosaurus", "Carnivore", "1h 50m", "Night pressure, venom disruption, and ambush control.", "Weak in direct daylight trades.", "Hunt in pairs at night, create panic, and avoid clean face-tank fights.", "Nocturnal hunter", "Intermediate", "Playable"],
  ["herrerasaurus", "Herrerasaurus", "Carnivore", "1h 20m", "Climbing, scouting, and vertical ambush.", "Low mass and risky failed leaps.", "Use trees and cliffs for intel, pick isolated prey, and escape vertically.", "Tree ambusher", "Advanced", "Playable"],
  ["omniraptor", "Omniraptor", "Carnivore", "1h 45m", "Pack pounce and bleed stacking.", "Low durability when caught.", "Coordinate pounces, rotate attackers, and keep stamina discipline.", "Pack hunter", "Advanced", "Playable"],
  ["pteranodon", "Pteranodon", "Carnivore", "1h 05m", "Flight, scouting, fishing, and safe repositioning.", "Very fragile on the ground.", "Stay airborne, scout events, fish safely, and avoid low stamina landings.", "Aerial scout", "Beginner", "Playable"],
  ["stegosaurus", "Stegosaurus", "Herbivore", "4h 30m", "Area denial and devastating tail damage.", "Slow, loud, and stamina constrained.", "Hold terrain, protect herds, and punish overconfident predators.", "Herd anchor", "Intermediate", "Playable"],
  ["tenontosaurus", "Tenontosaurus", "Herbivore", "2h 25m", "Agility, kicks, and defensive dueling.", "Requires precise spacing.", "Bait lunges, kick through commits, and rotate with herd support.", "Duelist herbivore", "Intermediate", "Playable"],
  ["dryosaurus", "Dryosaurus", "Herbivore", "45m", "Small profile and escape speed.", "Minimal fighting power.", "Play alert, use cover, and focus on survival routes and nesting support.", "Starter survivor", "Beginner", "Playable"],
  ["gallimimus", "Gallimimus", "Omnivore", "1h 30m", "Speed, stamina, scouting, and flock mobility.", "Limited damage and poor brawl value.", "Control information, escort herds, and never let predators dictate your path.", "Flock runner", "Beginner", "Playable"],
  ["beipiaosaurus", "Beipiaosaurus", "Omnivore", "1h 15m", "Flexible semi-aquatic survival.", "Outclassed by specialists.", "Use mixed diet options, avoid apex routes, and survive through adaptability.", "Water-edge omnivore", "Beginner", "Playable"],
  ["hypsilophodon", "Hypsilophodon", "Herbivore", "40m", "Tiny profile, agility, and defensive spit.", "Almost no direct fighting power.", "Stay in dense cover, warn herds, blind pursuers, and survive through movement.", "Scout herbivore", "Beginner", "Playable"],
  ["pachycephalosaurus", "Pachycephalosaurus", "Herbivore", "2h 10m", "Bone-breaking headbutt pressure.", "Needs clean spacing and stamina control.", "Use terrain and timing to fracture careless predators and escape pressure.", "Disruptor", "Intermediate", "Playable"],
  ["diabloceratops", "Diabloceratops", "Herbivore", "3h 15m", "Compact bruiser with strong defensive trades.", "Can be kited by faster coordinated predators.", "Hold herd edges, protect juveniles, and force predators into bad angles.", "Herd defender", "Intermediate", "Playable"],
  ["maiasaura", "Maiasaura", "Herbivore", "3h 30m", "Herd speed, stamina, and group survival.", "Solo players are vulnerable in open ground.", "Move with the herd, rotate feeding zones, and avoid unnecessary fights.", "Herd runner", "Beginner", "Playable"],
  ["troodon", "Troodon", "Carnivore", "1h 00m", "Venom pounce and pack harassment.", "Extremely fragile when isolated.", "Attack in coordinated waves, stack pressure, and leave before larger prey pins you.", "Pack venom hunter", "Advanced", "Playable"],
  ["triceratops", "Triceratops", "Herbivore", "5h+", "Apex herbivore tank with devastating frontal control.", "Slow, loud, and a major target for organized carnivores.", "Anchor the herd, face threats directly, and avoid being split from support.", "Apex herbivore", "Advanced", "Hordetesting / upcoming"],
  ["tyrannosaurus", "Tyrannosaurus", "Carnivore", "6h+", "Apex bite pressure and finishing power.", "Slow acceleration and costly stamina mistakes.", "Control territory and commit only when the kill is realistic.", "Apex carnivore", "Advanced", "Hordetesting / upcoming"],
  ["allosaurus", "Allosaurus", "Carnivore", "3h+", "Balanced mid-tier pressure, bleed, and mobility.", "Can lose trades against specialists.", "Track wounded prey, pressure from angles, and avoid face-tanking.", "Mid carnivore", "Intermediate", "Upcoming"],
  ["baryonyx", "Baryonyx", "Carnivore", "3h+", "Riverside ambush and fish-route control.", "Less dominant away from water corridors.", "Patrol banks, punish thirsty prey, and retreat through water-side cover.", "Riverside predator", "Intermediate", "Upcoming"],
  ["kentrosaurus", "Kentrosaurus", "Herbivore", "2h+", "Spike punishment and defensive spacing.", "Needs careful positioning against packs.", "Punish close commits, guard tight paths, and move with larger herbivores.", "Defensive herbivore", "Intermediate", "Upcoming"],
  ["austroraptor", "Austroraptor", "Carnivore", "2h+", "Speed, reach, and fish specialist routes.", "Weak if forced into direct brawls.", "Skirmish around water and cover, pick isolated prey, and avoid long trades.", "Skirmisher", "Intermediate", "Upcoming"]
].map(([slug, name, diet, growth, strength, weakness, playstyle, role, difficulty, status], order) => ({
  slug,
  name,
  diet,
  growth,
  strength,
  weakness,
  playstyle,
  role,
  difficulty,
  status,
  image: dinosaurImages[slug],
  order
}));

const content = {
  announcements: [
    { id: "asia-routes", title: "Asia migration routes refreshed", body: "New sanctuary and migration callouts are live for weekend play.", date: "2026-08-03" },
    { id: "double-growth", title: "Double Growth Weekend", body: "Friday 20:00 JST through Monday 02:00 JST for verified Discord members.", date: "2026-08-07" },
    { id: "moderator-applications", title: "Moderator applications open", body: "We are recruiting English-speaking staff for JP/KR/TW/HK/SG time zones.", date: "2026-08-10" }
  ],
  newsCards: [
    { id: "host-upgrade", title: "Hong Kong host upgrade", excerpt: "Lower routing latency for Japan, Korea, Taiwan, and Singapore players.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", order: 1 },
    { id: "nest-week", title: "Nest week spotlight", excerpt: "Community nesting channels and helper groups are now available.", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80", order: 2 },
    { id: "tournament-ruleset", title: "Tournament ruleset", excerpt: "Structured PvP bracket rules are ready for public testing.", image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80", order: 3 }
  ],
  features: [
    { id: "routing", title: "Asia-first routing", description: "Hong Kong host, low-latency target, and regional play windows.", icon: "RadioTower", order: 1 },
    { id: "moderation", title: "Active moderation", description: "English-speaking staff coverage across major Asia time zones.", icon: "Shield", order: 2 },
    { id: "events", title: "Competitive events", description: "PvP tournaments, pack hunts, nesting events, and seasonal ladders.", icon: "Trophy", order: 3 },
    { id: "progression", title: "Community progression", description: "Profiles, leaderboards, supporter roles, and staff-led onboarding.", icon: "Users", order: 4 }
  ],
  rules: [
    { id: "general", title: "General Rules", icon: "Shield", items: ["Respect all players and staff.", "Use English in global channels.", "No harassment, hate speech, or targeted griefing.", "Follow staff instructions during incidents."], order: 1 },
    { id: "pvp", title: "PvP Rules", icon: "Swords", items: ["No combat logging.", "No mix-packing outside approved event formats.", "No body denial or terrain abuse.", "Honor tournament-specific rules when active."], order: 2 },
    { id: "chat", title: "Chat Rules", icon: "Users", items: ["Keep global chat readable.", "No spam, slurs, political fights, or explicit content.", "Use report channels for disputes.", "Do not leak private tickets."], order: 3 },
    { id: "exploits", title: "Exploits", icon: "Skull", items: ["No map exploits, dupes, macro abuse, or third-party advantage tools.", "Report reproducible bugs privately.", "Do not teach exploit methods in public channels."], order: 4 },
    { id: "punishments", title: "Punishments", icon: "Crown", items: ["Warnings, mutes, kicks, temporary bans, or permanent bans may be applied.", "Appeals are reviewed through the official form.", "Repeat abuse escalates quickly."], order: 5 }
  ],
  dinosaurs,
  events: [
    { id: "weekly-herd-run", title: "Weekly Herd Run", type: "Weekly Event", when: "Every Wednesday 21:00 JST", icon: "CalendarDays", order: 1 },
    { id: "double-growth-weekend", title: "Double Growth Weekend", type: "Growth Boost", when: "Every approved community weekend", icon: "Sparkles", order: 2 },
    { id: "pvp-tournament", title: "PvP Tournament", type: "Competitive", when: "Monthly Sunday 20:00 JST", icon: "Swords", order: 3 }
  ],
  staff: [
    { id: "owner-taku", name: "Taku", role: "Owner", discord: "@taku", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=Taku", order: 1 },
    { id: "admin-mina", name: "Mina", role: "Administrator", discord: "@mina.asia", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=Mina", order: 2 },
    { id: "mod-joon", name: "Joon", role: "Moderator", discord: "@joon.kr", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=Joon", order: 3 },
    { id: "helper-wei", name: "Wei", role: "Helper", discord: "@wei.tw", avatar: "https://api.dicebear.com/9.x/shapes/svg?seed=Wei", order: 4 }
  ],
  mapMarkers: [
    { id: "delta-water", type: "water", name: "Delta Crossing", x: 22, y: 36, risk: "High", note: "Heavy predator traffic around shallow crossings.", order: 1 },
    { id: "north-water", type: "water", name: "Northern Falls", x: 67, y: 27, risk: "Medium", note: "Reliable water with cliff cover and ambush angles.", order: 2 },
    { id: "fern-nursery", type: "sanctuary", name: "Fern Nursery", x: 39, y: 53, risk: "Low", note: "Good early growth zone with nearby cover.", order: 3 },
    { id: "central-migration", type: "migration", name: "Central Migration", x: 61, y: 45, risk: "High", note: "Prime herd route and carnivore intercept lane.", order: 4 },
    { id: "east-spawn", type: "spawn", name: "Eastern Spawn", x: 76, y: 69, risk: "Low", note: "Starter route toward water and food.", order: 5 },
    { id: "highland-carcass", type: "food", name: "Highland Carcass", x: 49, y: 24, risk: "High", note: "Contested food source during peak hours.", order: 6 }
  ],
  gallery: [
    { id: "sanctuary-sunrise", type: "Screenshot", title: "Sanctuary sunrise", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80", order: 1 },
    { id: "tournament-final", type: "Video", title: "Tournament final", image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80", order: 2 },
    { id: "pack-emblem", type: "Community Creation", title: "Pack emblem", image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80", order: 3 }
  ],
  donationRewards: [
    { id: "vip", title: "VIP", icon: "Crown", body: "Supporter profile badge and VIP Discord channel access.", order: 1 },
    { id: "cosmetics", title: "Cosmetic rewards", icon: "Gem", body: "Cosmetic-only recognition systems designed to avoid pay-to-win pressure.", order: 2 },
    { id: "priority-queue", title: "Priority Queue", icon: "Server", body: "Optional queue priority once payment APIs and server hooks are connected.", order: 3 }
  ],
  donationGoals: [
    { id: "monthly", label: "Monthly goal", current: 184, target: 300, currency: "$", description: "Hosting, moderation tools, analytics, event prizes, and community infrastructure." }
  ]
};

const siteText = {
  en: {
    heroBadge: "English-speaking Asia community",
    heroBody: "A premium Hong Kong hosted community for survival, PvP, nesting, events, and regional coordination across Japan, Mongolia, Korea, Hong Kong, Taiwan, Singapore, and Southeast Asia.",
    joinDiscord: "Join Discord",
    connectServer: "Connect Server",
    copyIp: "Copy IP",
    copied: "Copied"
  },
  ja: {
    heroBadge: "アジア向け英語コミュニティ",
    heroBody: "日本、モンゴル、韓国、香港、台湾、シンガポール、東南アジアのプレイヤーに向けた The Isle コミュニティサーバーです。",
    joinDiscord: "Discord に参加",
    connectServer: "サーバー接続",
    copyIp: "IPをコピー",
    copied: "コピー済み"
  },
  ko: {
    heroBadge: "아시아 영어 커뮤니티",
    heroBody: "일본, 몽골, 한국, 홍콩, 대만, 싱가포르, 동남아시아 플레이어를 위한 The Isle 커뮤니티 서버입니다.",
    joinDiscord: "Discord 참여",
    connectServer: "서버 접속",
    copyIp: "IP 복사",
    copied: "복사됨"
  },
  mn: {
    heroBadge: "Азийн англи хэлтэй community",
    heroBody: "Япон, Монгол, Солонгос, Хонконг, Тайвань, Сингапур болон Зүүн Өмнөд Азийн тоглогчдод зориулсан The Isle community server.",
    joinDiscord: "Discord-д нэгдэх",
    connectServer: "Серверт холбогдох",
    copyIp: "IP хуулах",
    copied: "Хуулсан"
  }
};

const batch = db.batch();

for (const [collection, documents] of Object.entries(content)) {
  for (const document of documents) {
    const { id, ...data } = document;
    const documentId = id || document.slug || document.name || document.title;
    batch.set(db.collection(collection).doc(String(documentId)), { ...data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  }
}

batch.set(db.collection("siteText").doc("main"), siteText, { merge: true });

await batch.commit();

console.log(`Seeded Firestore content collections in project ${projectId}.`);
