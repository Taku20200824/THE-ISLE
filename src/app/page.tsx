import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { features, newsCards } from "@/data/site";
import { getFirestoreAnnouncements } from "@/lib/firebase/firestore-data";
import { getServerStatus } from "@/lib/integrations/server-status";
import { ServerStatusSummary } from "@/components/server-status-summary";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function HomePage() {
  const [announcements, serverStatus] = await Promise.all([getFirestoreAnnouncements(), getServerStatus()]);

  return (
    <main>
      <Hero serverStatus={serverStatus} />
      <section className="container py-20">
        <SectionHeading eyebrow="BisectHosting server" title="Live community server information" description="The Isle runs on BisectHosting. The website reads server information from Firebase." />
        <ServerStatusSummary status={serverStatus} />
      </section>
      <section className="container pb-20">
        <SectionHeading eyebrow="Operations" title="Latest announcements" description="Staff posts, community updates, and server-wide notices." />
        <div className="grid gap-4 md:grid-cols-3">
          {announcements.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Megaphone className="h-4 w-4" />
                  {item.date}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{item.body}</CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-y border-white/10 bg-white/[0.03] py-20">
        <div className="container">
          <SectionHeading eyebrow="News" title="Community intelligence" description="Highlights from server operations, events, balance policies, and regional play." />
          <div className="grid gap-5 md:grid-cols-3">
            {newsCards.map((card) => (
              <Card key={card.title} className="overflow-hidden">
                <img src={card.image} alt="" className="h-44 w-full object-cover" />
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{card.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="container py-20">
        <SectionHeading eyebrow="Server features" title="Built for serious survival communities" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-5">
                <feature.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/dinosaurs">
            Explore dinosaurs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
