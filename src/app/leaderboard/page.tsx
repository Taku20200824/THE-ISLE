import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { leaderboard } from "@/data/site";

export default function LeaderboardPage() {
  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Leaderboard" title="Top players" description="Rankings for playtime, kills, deaths, growth, and nest success." />
      <Card className="overflow-hidden">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.04] text-muted-foreground">
              <tr>
                {["Rank", "Player", "Playtime", "Kills", "Deaths", "Growth", "Nest Success", "Favorite"].map((head) => (
                  <th key={head} className="px-5 py-4 font-semibold">{head}</th>
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
