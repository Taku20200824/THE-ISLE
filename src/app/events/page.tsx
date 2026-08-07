import { SectionHeading } from "@/components/section-heading";
import { EventsContent } from "@/components/events-content";
import { getFirestoreEvents } from "@/lib/firebase/firestore-data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function EventsPage() {
  const events = await getFirestoreEvents();

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Events" title="Community calendar" description="Weekly events, Double Growth Weekend, and PvP Tournament scheduling." eyebrowKey="nav.events" titleKey="page.events.title" descriptionKey="page.events.description" />
      <EventsContent events={events} />
    </main>
  );
}
