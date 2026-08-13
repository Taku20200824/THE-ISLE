import { leaderboard as fallbackLeaderboard } from "@/data/site";
import { getPlayerProfiles } from "@/lib/firebase/player-profiles";

export type RankPlayer = {
  username: string;
  playtime: number;
  playtimeSeconds: number;
  kills: number;
  deaths: number;
  growth: number;
  nest: number;
  dinosaur: string;
  discord: string;
  avatar: string;
  steamId: string;
};

function scoreRank(player: Pick<RankPlayer, "playtime" | "kills" | "deaths" | "growth" | "nest">) {
  return player.playtime * 10 + player.kills * 25 + player.nest * 15 + player.growth - player.deaths * 5;
}

function isGeneratedSteamName(name: string, steamId: string) {
  return name === steamId || name === `Steam ${steamId.slice(-6)}`;
}

function displayName(username: string, personaName: string, steamId: string, isFallback?: boolean) {
  const name = username || personaName || "";

  if (!name || isFallback || isGeneratedSteamName(name, steamId)) {
    return "Steam linked";
  }

  return name;
}

function fallbackPlayers(): RankPlayer[] {
  return fallbackLeaderboard.map((player) => {
    const playtime = Number(player.playtime ?? 0);

    return {
      username: player.username,
      playtime,
      playtimeSeconds: playtime * 3600,
      kills: Number(player.kills ?? 0),
      deaths: Number(player.deaths ?? 0),
      growth: Number(player.growth ?? 0),
      nest: Number(player.nest ?? 0),
      dinosaur: String(player.dinosaur ?? "Unknown"),
      discord: "",
      avatar: "",
      steamId: ""
    };
  });
}

export async function getFirestoreLeaderboard() {
  const profiles = await getPlayerProfiles();
  const players = profiles.map((profile) => ({
    username: displayName(profile.username, profile.personaName, profile.steamId, profile.isFallback),
    playtime: profile.playtimeSeconds / 3600,
    playtimeSeconds: profile.playtimeSeconds,
    kills: profile.kills,
    deaths: profile.deaths,
    growth: profile.growth,
    nest: profile.nest,
    dinosaur: profile.favoriteDinosaur,
    discord: profile.profileUrl,
    avatar: profile.avatarUrl,
    steamId: profile.steamId
  }));

  const rankPlayers = players.length ? players : fallbackPlayers();

  return rankPlayers
    .sort((a, b) => scoreRank(b) - scoreRank(a))
    .slice(0, 25);
}

export async function getFirestorePlayer(username: string) {
  const players = await getFirestoreLeaderboard();
  const normalized = username.toLowerCase();

  return players.find((player) => player.username.toLowerCase() === normalized || player.steamId === username);
}
