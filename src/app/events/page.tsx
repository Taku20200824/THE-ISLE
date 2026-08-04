import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/site";

export default function EventsPage() {
  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Events" title="Community calendar" description="Weekly events, Double Growth Weekend, and PvP Tournament scheduling." />
      <div className="grid gap-5 md:grid-cols-3">
        {events.map((event) => (
          <Card key={event.title}>
            <CardHeader>
              <event.icon className="h-7 w-7 text-primary" />
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
