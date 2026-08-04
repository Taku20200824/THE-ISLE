import { Crown, Gem, Heart, Server } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rewards = [
  { title: "VIP", icon: Crown, body: "Supporter profile badge and VIP Discord channel access." },
  { title: "Cosmetic rewards", icon: Gem, body: "Cosmetic-only recognition systems designed to avoid pay-to-win pressure." },
  { title: "Priority Queue", icon: Server, body: "Optional queue priority once payment APIs and server hooks are connected." }
];

export default function DonatePage() {
  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Donate" title="Support server operations" description="Transparent donation goals, monthly costs, supporter roles, and future Stripe/PayPal integration." />
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Heart className="h-7 w-7 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Monthly goal</div>
              <div className="text-3xl font-bold">$184 / $300</div>
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[61%] bg-primary" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Hosting, moderation tools, analytics, event prizes, and community infrastructure.</p>
        </CardContent>
      </Card>
      <div className="grid gap-5 md:grid-cols-3">
        {rewards.map((reward) => (
          <Card key={reward.title}>
            <CardHeader>
              <reward.icon className="h-7 w-7 text-primary" />
              <CardTitle>{reward.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{reward.body}</CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-8" disabled>Payments coming soon</Button>
    </main>
  );
}
