import { ExternalLink, MapPinned } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

const gatewayMapUrl = "https://theisle.ru/en/maps?map=evrima";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function MapPage() {
  return (
    <main className="container min-h-screen pt-32 pb-20 sm:pt-36">
      <SectionHeading
        eyebrow="Map"
        title="Gateway interactive map"
        description="Use the live Evrima Gateway map for locations, rivers, sanctuaries, spawns, migration routes, and food points."
      />

      <section className="overflow-hidden rounded-lg border border-white/10 bg-black/35 shadow-[0_24px_80px_rgba(0,0,0,.35)]">
        <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[.03] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-primary/25 bg-primary/10 p-2 text-primary">
              <MapPinned className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-black text-white">TheIsle.ru Evrima Gateway</h2>
              <p className="text-sm text-muted-foreground">Interactive community map embedded for quick in-game reference.</p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <a href={gatewayMapUrl} target="_blank" rel="noopener noreferrer">
              Open full map
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="h-[72vh] min-h-[560px] bg-black">
          <iframe
            src={gatewayMapUrl}
            title="TheIsle.ru Evrima Gateway interactive map"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
          />
        </div>
      </section>
    </main>
  );
}
