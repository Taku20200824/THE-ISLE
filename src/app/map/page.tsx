import { SectionHeading } from "@/components/section-heading";
import { IsleMap } from "@/components/isle-map";

export default function MapPage() {
  return (
    <main className="container min-h-screen pt-32 pb-20 sm:pt-36">
      <SectionHeading
        eyebrow="Map"
        title="Gateway tactical map"
        description="Filter routes, water, sanctuary, spawn, migration, and food points with live-style community intel."
      />
      <IsleMap />
    </main>
  );
}
