"use client";

import { useMemo, useState } from "react";
import { Crosshair, Drumstick, Info, Leaf, MapPin, RotateCcw, Route, Waves, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MarkerType = "water" | "sanctuary" | "migration" | "spawn" | "food";

type MapMarker = {
  id: string;
  type: MarkerType;
  name: string;
  x: number;
  y: number;
  risk: "Low" | "Medium" | "High";
  note: string;
};

const markerStyles: Record<MarkerType, { label: string; icon: typeof Waves; color: string; ring: string }> = {
  water: { label: "Water", icon: Waves, color: "bg-cyan-300 text-cyan-950", ring: "ring-cyan-300/45" },
  sanctuary: { label: "Sanctuary", icon: Leaf, color: "bg-emerald-300 text-emerald-950", ring: "ring-emerald-300/45" },
  migration: { label: "Migration", icon: Route, color: "bg-amber-300 text-amber-950", ring: "ring-amber-300/45" },
  spawn: { label: "Spawn", icon: Crosshair, color: "bg-sky-300 text-sky-950", ring: "ring-sky-300/45" },
  food: { label: "Food", icon: Drumstick, color: "bg-rose-300 text-rose-950", ring: "ring-rose-300/45" }
};

const markers: MapMarker[] = [
  { id: "delta-water", type: "water", name: "Delta Crossing", x: 22, y: 36, risk: "High", note: "Heavy predator traffic around shallow crossings." },
  { id: "north-water", type: "water", name: "Northern Falls", x: 67, y: 27, risk: "Medium", note: "Reliable water with cliff cover and ambush angles." },
  { id: "coast-water", type: "water", name: "Mangrove Pool", x: 82, y: 64, risk: "Low", note: "Safer drinking route for young herbivores." },
  { id: "west-sanctuary", type: "sanctuary", name: "Fern Nursery", x: 39, y: 53, risk: "Low", note: "Good early growth zone with nearby cover." },
  { id: "ridge-sanctuary", type: "sanctuary", name: "Ridge Hollow", x: 56, y: 34, risk: "Medium", note: "Sheltered but exposed when moving out." },
  { id: "central-migration", type: "migration", name: "Central Migration", x: 61, y: 45, risk: "High", note: "Prime herd route and carnivore intercept lane." },
  { id: "south-migration", type: "migration", name: "Southern Valley", x: 30, y: 73, risk: "Medium", note: "Long travel lane with several escape breaks." },
  { id: "east-spawn", type: "spawn", name: "Eastern Spawn", x: 76, y: 69, risk: "Low", note: "Starter route toward water and food." },
  { id: "highland-spawn", type: "spawn", name: "Highland Spawn", x: 47, y: 21, risk: "Medium", note: "Fast access to hills, slower route to water." },
  { id: "north-food", type: "food", name: "Highland Carcass", x: 49, y: 24, risk: "High", note: "Contested food source during peak hours." },
  { id: "jungle-food", type: "food", name: "Jungle Forage", x: 71, y: 52, risk: "Medium", note: "Good omnivore and juvenile feeding path." }
];

const regions = [
  { name: "Northern Highlands", className: "left-[41%] top-[16%]" },
  { name: "Central Basin", className: "left-[50%] top-[48%]" },
  { name: "Eastern Wetlands", className: "left-[76%] top-[57%]" },
  { name: "Southern Jungle", className: "left-[31%] top-[78%]" }
];

export function IsleMap() {
  const [activeTypes, setActiveTypes] = useState<MarkerType[]>(["water", "sanctuary", "migration", "spawn", "food"]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(markers[0].id);
  const [zoom, setZoom] = useState(1);

  const selectedMarker = markers.find((marker) => marker.id === selectedMarkerId) ?? markers[0];
  const visibleMarkers = useMemo(() => markers.filter((marker) => activeTypes.includes(marker.type)), [activeTypes]);

  function toggleType(type: MarkerType) {
    setActiveTypes((current) => {
      if (current.length === 1 && current.includes(type)) {
        return current;
      }

      return current.includes(type) ? current.filter((item) => item !== type) : [...current, type];
    });
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-black/35 shadow-[0_30px_120px_rgba(0,0,0,.45)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[.04] p-3">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(markerStyles) as MarkerType[]).map((type) => {
              const style = markerStyles[type];
              const Icon = style.icon;
              const active = activeTypes.includes(type);

              return (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-bold uppercase tracking-normal transition",
                    active ? "border-primary/45 bg-primary/15 text-primary" : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {style.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))} aria-label="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="w-16 text-center text-xs font-bold text-zinc-300">{Math.round(zoom * 100)}%</div>
            <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.min(1.35, value + 0.1))} aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(1)} aria-label="Reset zoom">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative min-h-[560px] overflow-auto bg-[#06100c] p-3">
          <div
            className="relative mx-auto aspect-[16/9] min-w-[980px] origin-top-left overflow-hidden rounded-lg border border-emerald-300/15"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_34%,rgba(34,211,238,.26),transparent_18%),radial-gradient(circle_at_63%_44%,rgba(52,211,153,.24),transparent_18%),linear-gradient(135deg,#0c1726,#083326_52%,#10230e)]" />
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" role="img" aria-label="Gateway tactical map">
              <path d="M0 660 C230 610 325 710 480 620 C650 520 778 604 940 515 C1110 421 1288 488 1600 385 L1600 900 L0 900 Z" fill="rgba(21,83,45,.7)" />
              <path d="M0 210 C220 166 348 204 492 162 C690 103 826 194 1027 128 C1216 67 1390 92 1600 44 L1600 0 L0 0 Z" fill="rgba(15,23,42,.58)" />
              <path d="M198 0 C254 150 291 245 372 350 C454 455 474 566 424 900" fill="none" stroke="rgba(34,211,238,.55)" strokeWidth="26" strokeLinecap="round" />
              <path d="M1038 0 C1058 165 1008 270 1062 407 C1118 552 1235 624 1324 900" fill="none" stroke="rgba(34,211,238,.42)" strokeWidth="22" strokeLinecap="round" />
              <path d="M300 735 C505 612 590 492 750 450 C900 410 1035 447 1238 348" fill="none" stroke="rgba(250,204,21,.5)" strokeWidth="10" strokeDasharray="26 20" strokeLinecap="round" />
              <path d="M438 210 C571 300 697 335 818 320 C980 300 1070 235 1222 240" fill="none" stroke="rgba(250,204,21,.38)" strokeWidth="8" strokeDasharray="22 18" strokeLinecap="round" />
              <path d="M210 154 C420 118 515 235 694 180 C860 130 991 172 1197 100" fill="none" stroke="rgba(255,255,255,.11)" strokeWidth="3" />
              <path d="M90 405 C276 360 421 430 590 370 C797 296 933 356 1135 292 C1280 247 1406 284 1535 230" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="3" />
              <path d="M120 560 C320 515 484 575 670 510 C892 434 1030 516 1255 445 C1418 395 1518 432 1600 410" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="3" />
              <path d="M0 782 C260 758 388 802 560 742 C720 686 876 718 1010 658 C1175 586 1380 630 1600 572" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3" />
            </svg>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.42),transparent_28%,transparent_68%,rgba(0,0,0,.42)),radial-gradient(circle_at_50%_50%,transparent_35%,rgba(0,0,0,.52))]" />

            {regions.map((region) => (
              <div key={region.name} className={cn("pointer-events-none absolute rounded bg-black/30 px-2 py-1 text-[11px] font-bold uppercase text-white/45", region.className)}>
                {region.name}
              </div>
            ))}

            {visibleMarkers.map((marker) => {
              const style = markerStyles[marker.type];
              const Icon = style.icon;
              const selected = selectedMarker.id === marker.id;

              return (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarkerId(marker.id)}
                  className={cn(
                    "absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/70 font-bold shadow-[0_10px_34px_rgba(0,0,0,.55)] ring-4 transition hover:scale-110",
                    style.color,
                    selected ? "scale-110 ring-white/60" : style.ring
                  )}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  aria-label={marker.name}
                  title={marker.name}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-xs text-zinc-300 backdrop-blur">
              <div className="font-bold uppercase text-white">Gateway operations map</div>
              <div className="mt-1 text-zinc-400">Grid, routes, water, sanctuary, migration, spawn, food</div>
            </div>
          </div>
        </div>
      </div>

      <aside className="rounded-lg border border-white/10 bg-white/[.04] p-5 backdrop-blur">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary">
          <Info className="h-4 w-4" />
          Selected Intel
        </div>
        <h2 className="mt-4 text-3xl font-black text-white">{selectedMarker.name}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={cn("inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-bold uppercase", markerStyles[selectedMarker.type].color)}>
            {markerStyles[selectedMarker.type].label}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold uppercase text-zinc-300">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {Math.round(selectedMarker.x)} / {Math.round(selectedMarker.y)}
          </span>
        </div>
        <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
          <div className="text-xs font-bold uppercase text-zinc-500">Risk</div>
          <div className="mt-1 text-xl font-black text-white">{selectedMarker.risk}</div>
        </div>
        <p className="mt-5 text-sm leading-7 text-zinc-300">{selectedMarker.note}</p>

        <div className="mt-8 grid gap-3 text-sm text-zinc-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span>Visible markers</span>
            <span className="font-bold text-white">{visibleMarkers.length}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span>Active filters</span>
            <span className="font-bold text-white">{activeTypes.length}/5</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Map version</span>
            <span className="font-bold text-white">Gateway Community Draft</span>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-zinc-200">
          Use this as a community overlay. Marker data can later be moved to Firebase when you want staff to edit routes without code changes.
        </div>
      </aside>
    </section>
  );
}
