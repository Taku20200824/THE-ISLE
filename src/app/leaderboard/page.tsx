import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getFirestoreLeaderboard } from "@/lib/firebase/firestore-data";
import { LocalizedText } from "@/components/localized-text";
import type { TranslationKey } from "@/lib/i18n";

export default async function LeaderboardPage() {
  const leaderboard = await getFirestoreLeaderboard();

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Leaderboard" title="Top players" description="Rankings for playtime, kills, deaths, growth, and nest success." eyebrowKey="nav.leaderboard" titleKey="page.leaderboard.title" descriptionKey="page.leaderboard.description" />
      <Card className="overflow-hidden">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.04] text-muted-foreground">
              <tr>
                {[
                  ["Rank", "table.rank"],
                  ["Player", "table.player"],
                  ["Playtime", "table.playtime"],
                  ["Kills", "table.kills"],
                  ["Deaths", "table.deaths"],
                  ["Growth", "table.growth"],
                  ["Nest Success", "table.nestSuccess"],
                  ["Favorite", "table.favorite"]
                ].map(([head, key]) => (
                  <th key={head} className="px-5 py-4 font-semibold"><LocalizedText tKey={key as TranslationKey} /></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr key={player.username} className="border-t border-white/10">
                  <td className="px-5 py-4 font-bold text-primary">#{index + 1}</td>
                  <td className="px-5 py-4">
                    <Link href={`/players/${player.username}`} className="font-semibold hover:text-primary">{player.username}</Link>
                  </td>
                  <td className="px-5 py-4">{player.playtime}h</td>
                  <td className="px-5 py-4">{player.kills}</td>
                  <td className="px-5 py-4">{player.deaths}</td>
                  <td className="px-5 py-4">{player.growth}%</td>
                  <td className="px-5 py-4">{player.nest}</td>
                  <td className="px-5 py-4">{player.dinosaur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
}
