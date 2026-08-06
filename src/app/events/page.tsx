import { CalendarDays, Sparkles, Swords } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFirestoreEvents } from "@/lib/firebase/firestore-data";

const eventIcons = { CalendarDays, Sparkles, Swords };

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function EventsPage() {
  const events = await getFirestoreEvents();

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Events" title="Community calendar" description="Weekly events, Double Growth Weekend, and PvP Tournament scheduling." eyebrowKey="nav.events" titleKey="page.events.title" descriptionKey="page.events.description" />
      <div className="grid gap-5 md:grid-cols-3">
        {events.map((event) => (
          <Card key={event.title}>
            <CardHeader>
              {(() => {
                const Icon = typeof event.icon === "string" ? eventIcons[event.icon as keyof typeof eventIcons] ?? CalendarDays : event.icon;
                return <Icon className="h-7 w-7 text-primary" />;
              })()}
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{event.type}</div>
              <div className="mt-2 font-semibold">{event.when}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardContent className="grid gap-2 p-5 sm:grid-cols-7">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <div key={day} className="min-h-28 rounded-md border border-white/10 bg-white/[0.03] p-3">
              <div className="text-sm font-semibold">{day}</div>
              {index === 2 ? <p className="mt-4 text-xs text-primary">Weekly Herd Run</p> : null}
              {index >= 4 ? <p className="mt-4 text-xs text-secondary">Double Growth</p> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
