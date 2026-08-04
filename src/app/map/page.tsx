import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mapMarkers } from "@/data/site";

export default function MapPage() {
  const markerTypes = ["Water", "Sanctuary", "Migration", "Spawn", "Food"];

  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Map" title="Interactive survival overlay" description="A front-end ready tactical map for water, sanctuary, migration, spawn, and food markers." />
      <div className="mb-4 flex flex-wrap gap-2">
        {markerTypes.map((type) => (
          <Badge key={type}>{type}</Badge>
        ))}
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="map-grid relative aspect-[16/10] min-h-[420px]">
            {mapMarkers.map((marker, index) => (
              <button
                key={`${marker.type}-${index}`}
                className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${marker.color} font-bold text-slate-950 shadow-lg ring-4 ring-black/35 transition hover:scale-110`}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                aria-label={marker.type}
                title={marker.type}
              >
                {marker.icon}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
