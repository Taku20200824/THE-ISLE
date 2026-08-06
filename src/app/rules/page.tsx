import { Crown, Shield, Skull, Swords, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFirestoreRules } from "@/lib/firebase/firestore-data";

const ruleIcons = { Crown, Shield, Skull, Swords, Users };

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function RulesPage() {
  const rules = await getFirestoreRules();

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Rules" title="Clear rules, consistent enforcement" description="A beautiful rulebook for survival, PvP, chat, exploit policy, and punishments." />
      <div className="grid gap-5 lg:grid-cols-2">
        {rules.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              {(() => {
                const Icon = typeof group.icon === "string" ? ruleIcons[group.icon as keyof typeof ruleIcons] ?? Shield : group.icon;
                return <Icon className="h-7 w-7 text-primary" />;
              })()}
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item} className="rounded-md border border-white/10 bg-white/[0.03] p-3">{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
