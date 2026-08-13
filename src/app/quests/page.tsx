import Link from "next/link";
import { cookies } from "next/headers";
import { CheckCircle2, Circle, Compass, ExternalLink, LogIn, Target, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { getPlayerProfile } from "@/lib/firebase/player-profiles";
import { formatPlaytime } from "@/lib/format-playtime";
import { getPlayerQuests, getQuestSummary, type PlayerQuest } from "@/lib/quests";
import { readSteamVoiceCookie, steamVoiceCookieName } from "@/lib/steam-voice";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function formatQuestValue(quest: PlayerQuest, value: number) {
  if (quest.metric === "seconds") return formatPlaytime(value);
  if (quest.metric === "growth") return `${value}%`;
  return String(value);
}

export default async function QuestsPage() {
  const cookieStore = await cookies();
  const steamId = readSteamVoiceCookie(cookieStore.get(steamVoiceCookieName)?.value);
  const profile = steamId ? await getPlayerProfile(steamId) : null;
  const quests = getPlayerQuests(profile, steamId);
  const summary = getQuestSummary(quests);

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <section className="relative overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_10%_16%,rgba(45,212,191,.24),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(250,204,21,.16),transparent_28%),linear-gradient(135deg,rgba(6,20,18,.94),rgba(9,16,26,.82)_55%,rgba(26,18,38,.58))] p-6 shadow-[0_30px_120px_rgba(0,0,0,.45)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Server quests"
            title="Community progression"
            description="Steam-linked quests powered by live server profile data. Playtime quests update automatically when the server tracker syncs you."
          />
          <div className="rounded-lg border border-white/10 bg-black/35 p-4 sm:min-w-[240px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary">
              <Trophy className="h-4 w-4" /> Quest progress
            </div>
            <div className="mt-2 font-display text-3xl font-black text-white">
              {summary.completed}/{summary.total}
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${summary.percent}%` }} />
            </div>
          </div>
        </div>

        {!steamId ? (
          <div className="mt-6 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary"><LogIn className="h-4 w-4" /> Steam required</div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">Sign in with Steam to see your own quest progress and sync playtime from the server.</p>
              </div>
              <Button asChild>
                <a href="/api/steam/login"><LogIn className="h-4 w-4" /> Sign in with Steam</a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-zinc-300">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span>Steam linked: <span className="font-semibold text-white">{profile?.username || profile?.personaName || steamId}</span></span>
            <Link href={`/players/${steamId}`} className="inline-flex items-center gap-1 text-primary hover:text-white">
              Profile <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quests.map((quest) => {
          const done = quest.current >= quest.target;
          const percent = Math.round((quest.current / quest.target) * 100);

          return (
            <article key={quest.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_60px_rgba(0,0,0,.28)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/30">
                  {done ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-zinc-500" />}
                </div>
                <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs font-bold text-zinc-300">
                  {formatQuestValue(quest, quest.current)} / {formatQuestValue(quest, quest.target)}
                </span>
              </div>
              <h2 className="mt-4 font-display text-xl font-black text-white">{quest.title}</h2>
              <p className="mt-2 min-h-[48px] text-sm leading-6 text-zinc-400">{quest.description}</p>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(100, percent)}%` }} />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs text-zinc-400">
                <span className="inline-flex items-center gap-1"><Target className="h-3.5 w-3.5 text-primary" /> {done ? "Complete" : "In progress"}</span>
                <span className="inline-flex items-center gap-1"><Timer className="h-3.5 w-3.5 text-amber-300" /> {quest.reward}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-lg border border-white/10 bg-black/35 p-5">
        <div className="flex items-start gap-3">
          <Compass className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-6 text-zinc-400">
            In-game Evrima zone goals like migration, patrol, sanctuary, and Prime progress are still handled by the game. This page tracks TAKU community quests from the server profile database.
          </p>
        </div>
      </section>
    </main>
  );
}
