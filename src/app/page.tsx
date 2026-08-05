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
            <Card key={item.title} className="hud-card transition duration-300 hover:-translate-y-1 hover:border-primary/30">
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
      <section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(15,23,42,.12))] py-20">
        <div className="container">
          <SectionHeading eyebrow="News" title="Community intelligence" description="Highlights from server operations, events, balance policies, and regional play." />
          <div className="grid gap-5 md:grid-cols-3">
            {newsCards.map((card) => (
              <Card key={card.title} className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img src={card.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <CardHeader className="-mt-5 relative z-10">
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
            <Card key={feature.title} className="hud-card transition duration-300 hover:-translate-y-1 hover:border-secondary/30">
              <CardContent className="p-5">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
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
