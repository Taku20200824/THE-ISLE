import { MessageCircle, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDiscordCommunity } from "@/lib/integrations/discord";

export default async function DiscordPage() {
  const discord = await getDiscordCommunity();

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Discord" title="Community command center" description="Widget, staff, online moderators, and invite link." />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Discord Widget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-80 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-center text-muted-foreground">
              Embed your official Discord server widget here after enabling it in Discord server settings.
            </div>
            <Button className="mt-5" asChild>
              <a href={discord.invite}>
                <MessageCircle className="h-4 w-4" />
                Discord Invite
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Online Moderators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 flex items-center gap-3 text-2xl font-bold">
              <ShieldCheck className="h-7 w-7 text-primary" />
              {discord.onlineModerators}
            </div>
            <div className="space-y-3">
              {discord.staff.map((member) => (
                <div key={member.name} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3">
                  <img src={member.avatar} alt="" className="h-10 w-10 rounded-md" />
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role} · {member.discord}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
