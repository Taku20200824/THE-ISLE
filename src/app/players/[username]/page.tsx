import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { leaderboard } from "@/data/site";

export function generateStaticParams() {
  return leaderboard.map((player) => ({ username: player.username }));
}

type PlayerProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  const { username } = await params;
  const player = leaderboard.find((item) => item.username.toLowerCase() === username.toLowerCase());

  if (!player) {
    notFound();
  }

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Player profile" title={player.username} description="Public profile surface for linked Discord and in-game progression." />
      <Card>
        <CardContent className="grid gap-8 p-6 md:grid-cols-[220px_1fr]">
          <img src={`https://api.dicebear.com/9.x/shapes/svg?seed=${player.username}`} alt="" className="h-44 w-44 rounded-lg bg-white/10 p-3" />
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Playtime", `${player.playtime}h`],
                ["Kills", String(player.kills)],
                ["Deaths", String(player.deaths)],
                ["Growth", `${player.growth}%`],
                ["Nest Success", String(player.nest)],
                ["Favorite Dinosaur", player.dinosaur]
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div className="mt-1 text-lg font-semibold">{value}</div>
                </div>
              ))}
            </div>
            <Button className="mt-6" asChild>
              <a href="https://discord.com" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Discord Link
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
