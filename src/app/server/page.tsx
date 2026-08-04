import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { ServerStatusSummary } from "@/components/server-status-summary";
import { getServerStatus } from "@/lib/integrations/server-status";

export default async function ServerPage() {
  const status = await getServerStatus();

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Server" title="BisectHosting game server" description="The Isle Evrima runs on BisectHosting. Firebase stores public website status and admin-managed connection details." />
      <ServerStatusSummary status={status} />
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="text-sm text-muted-foreground">Infrastructure</div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            GitHub stores source code, Vercel deploys the website, Firebase stores website data, and BisectHosting runs the actual The Isle game server.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
