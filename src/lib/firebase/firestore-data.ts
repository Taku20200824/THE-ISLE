import { leaderboard as fallbackLeaderboard, announcements as fallbackAnnouncements, events as fallbackEvents, staff as fallbackStaff } from "@/data/site";
import { getAdminFirestore, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";

export type ScoreRecord = {
  username: string;
  playtime?: number;
  playtimeHours?: number;
  kills?: number;
  deaths?: number;
  growth?: number;
  growthPercent?: number;
  nest?: number;
  nestSuccess?: number;
  dinosaur?: string;
  favoriteDinosaur?: string;
};

function canUseAdminFirestore() {
  return hasFirebaseAdminCredentials();
}

export async function getFirestoreLeaderboard() {
  if (!canUseAdminFirestore()) {
    return fallbackLeaderboard;
  }

  try {
    const snapshot = await getAdminFirestore().collection("scores").orderBy("playtime", "desc").limit(25).get();

    if (snapshot.empty) {
      return fallbackLeaderboard;
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data() as ScoreRecord;
      return {
        username: data.username ?? doc.id,
        playtime: data.playtime ?? data.playtimeHours ?? 0,
        kills: data.kills ?? 0,
        deaths: data.deaths ?? 0,
        growth: data.growth ?? data.growthPercent ?? 0,
        nest: data.nest ?? data.nestSuccess ?? 0,
        dinosaur: data.dinosaur ?? data.favoriteDinosaur ?? "Unknown"
      };
    });
  } catch {
    return fallbackLeaderboard;
  }
}

export async function getFirestoreAnnouncements() {
  if (!canUseAdminFirestore()) {
    return fallbackAnnouncements;
  }

  try {
    const snapshot = await getAdminFirestore().collection("announcements").orderBy("date", "desc").limit(3).get();
    if (snapshot.empty) {
      return fallbackAnnouncements;
    }
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: String(data.title ?? doc.id),
        body: String(data.body ?? ""),
        date: String(data.date ?? "")
      };
    });
  } catch {
    return fallbackAnnouncements;
  }
}

export async function getFirestoreEvents() {
  return fallbackEvents;
}

export async function getFirestoreStaff() {
  return fallbackStaff;
}
