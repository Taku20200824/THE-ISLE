"use client";

import { useMemo, useState } from "react";
import { Crosshair, Drumstick, Info, Leaf, MapPin, RotateCcw, Route, Waves, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

type MarkerType = "water" | "sanctuary" | "migration" | "spawn" | "food";

export type IsleMapMarker = {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  risk: string;
  note: string;
};

const gatewayMapImageUrl = "https://theisle.pixelbuilt.org/assets/gateway-map.webp";

const labels = {
  en: {
    filters: { water: "Water", sanctuary: "Sanctuary", migration: "Migration", spawn: "Spawn", food: "Food" },
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    resetZoom: "Reset zoom",
    selectedIntel: "Selected information",
    risk: "Risk",
    visibleMarkers: "Visible markers",
    activeFilters: "Active filters",
    version: "Map version",
    versionValue: "Gateway basemap",
    source: "Basemap from The Isle Map by Pixelbuilt. Markers are local community overlays.",
    operations: "Gateway operations map",
    subtitle: "Zoom, filter, and select markers"
  },
  mn: {
    filters: { water: "Ус", sanctuary: "Sanctuary", migration: "Migration", spawn: "Spawn", food: "Food" },
    zoomOut: "Жижигрүүлэх",
    zoomIn: "Томруулах",
    resetZoom: "Zoom reset",
    selectedIntel: "Сонгосон мэдээлэл",
    risk: "Эрсдэл",
    visibleMarkers: "Харагдах marker",
    activeFilters: "Идэвхтэй filter",
    version: "Map хувилбар",
    versionValue: "Gateway basemap",
    source: "Basemap нь Pixelbuilt-ийн The Isle Map-аас. Marker-ууд нь манай community overlay.",
    operations: "Gateway ажиллагааны map",
    subtitle: "Zoom, filter, marker сонгох боломжтой"
  },
  ja: {
    filters: { water: "水", sanctuary: "Sanctuary", migration: "Migration", spawn: "Spawn", food: "Food" },
    zoomOut: "縮小",
    zoomIn: "拡大",
    resetZoom: "ズームリセット",
    selectedIntel: "選択中の情報",
    risk: "危険度",
    visibleMarkers: "表示マーカー",
    activeFilters: "有効フィルター",
    version: "マップ版",
    versionValue: "Gateway basemap",
    source: "Basemap は Pixelbuilt の The Isle Map を使用。Marker はローカル community overlay です。",
    operations: "Gateway 作戦マップ",
    subtitle: "ズーム、フィルター、マーカー選択ができます"
  },
  ko: {
    filters: { water: "물", sanctuary: "Sanctuary", migration: "Migration", spawn: "Spawn", food: "Food" },
    zoomOut: "축소",
    zoomIn: "확대",
    resetZoom: "줌 초기화",
    selectedIntel: "선택 정보",
    risk: "위험도",
    visibleMarkers: "표시 마커",
    activeFilters: "활성 필터",
    version: "지도 버전",
    versionValue: "Gateway basemap",
    source: "Basemap은 Pixelbuilt의 The Isle Map을 사용합니다. Marker는 로컬 community overlay입니다.",
    operations: "Gateway 작전 지도",
    subtitle: "줌, 필터, 마커 선택 가능"
  }
};

const markerMeta: Record<MarkerType, { icon: typeof Waves; color: string; ring: string }> = {
  water: { icon: Waves, color: "bg-cyan-300 text-cyan-950", ring: "ring-cyan-300/45" },
  sanctuary: { icon: Leaf, color: "bg-emerald-300 text-emerald-950", ring: "ring-emerald-300/45" },
  migration: { icon: Route, color: "bg-amber-300 text-amber-950", ring: "ring-amber-300/45" },
  spawn: { icon: Crosshair, color: "bg-sky-300 text-sky-950", ring: "ring-sky-300/45" },
  food: { icon: Drumstick, color: "bg-rose-300 text-rose-950", ring: "ring-rose-300/45" }
};

const fallbackMarkers: IsleMapMarker[] = [
  { id: "north-lake", type: "water", name: "North Lake", x: 63, y: 18, risk: "Medium", note: "Open water with long sight lines. Approach with cover." },
  { id: "water-access", type: "water", name: "Water Access", x: 42, y: 48, risk: "High", note: "Busy drinking route and common ambush area." },
  { id: "swamps-east", type: "water", name: "Swamps East", x: 58, y: 77, risk: "Medium", note: "Safer water if you move through tree cover." },
  { id: "north-sanctuary", type: "sanctuary", name: "Northern Sanctuary", x: 65, y: 28, risk: "Low", note: "Good early growth area with nearby exits." },
  { id: "south-sanctuary", type: "sanctuary", name: "Southern Sanctuary", x: 50, y: 75, risk: "Medium", note: "Useful for small groups, but paths are exposed." },
  { id: "center-migration", type: "migration", name: "Central Migration", x: 53, y: 54, risk: "High", note: "Main travel lane. Expect carnivore traffic." },
  { id: "west-migration", type: "migration", name: "West Rail Route", x: 30, y: 56, risk: "Medium", note: "Long route toward west rail and food paths." },
  { id: "north-spawn", type: "spawn", name: "Northwest Ridge Spawn", x: 35, y: 31, risk: "Medium", note: "Fast access to highland routes." },
  { id: "south-spawn", type: "spawn", name: "South Plains Spawn", x: 47, y: 82, risk: "Low", note: "Good starter route toward cover and water." },
  { id: "highland-food", type: "food", name: "Highland Food", x: 55, y: 36, risk: "High", note: "Contested feeding path near common routes." },
  { id: "jungle-food", type: "food", name: "Jungle Food", x: 49, y: 61, risk: "Medium", note: "Reliable food if you avoid central crossings." }
];

const regionLabels = [
  { name: "Northwest Ridge", className: "left-[27%] top-[28%]" },
  { name: "Northern Jungle", className: "left-[58%] top-[25%]" },
  { name: "Water Access", className: "left-[37%] top-[45%]" },
  { name: "Jungle Sector", className: "left-[49%] top-[58%]" },
  { name: "Swamps Center", className: "left-[50%] top-[72%]" },
  { name: "Southern Beach", className: "left-[52%] top-[87%]" }
];

function normalizeType(type: string): MarkerType {
  return type in markerMeta ? (type as MarkerType) : "water";
}

export function IsleMap({ markers = fallbackMarkers }: { markers?: IsleMapMarker[] }) {
  const { locale } = useLanguage();
  const text = labels[locale];
  const [activeTypes, setActiveTypes] = useState<MarkerType[]>(["water", "sanctuary", "migration", "spawn", "food"]);
  const [selectedMarkerId, setSelectedMarkerId] = useState(markers[0]?.id ?? "north-lake");
  const [zoom, setZoom] = useState(1);

  const selectedMarker = markers.find((marker) => marker.id === selectedMarkerId) ?? markers[0];
  const visibleMarkers = useMemo(() => markers.filter((marker) => activeTypes.includes(normalizeType(marker.type))), [activeTypes, markers]);

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
            {(Object.keys(markerMeta) as MarkerType[]).map((type) => {
              const meta = markerMeta[type];
              const Icon = meta.icon;
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
                  {text.filters[type]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.max(0.75, value - 0.1))} aria-label={text.zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="w-16 text-center text-xs font-bold text-zinc-300">{Math.round(zoom * 100)}%</div>
            <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.min(1.8, value + 0.1))} aria-label={text.zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(1)} aria-label={text.resetZoom}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-[72vh] min-h-[620px] overflow-auto bg-[#06080f] p-3">
          <div
            className="relative mx-auto aspect-square min-w-[920px] origin-top-left overflow-hidden rounded-lg border border-emerald-300/15 bg-black"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <img
              src={gatewayMapImageUrl}
              alt="The Isle Evrima Gateway basemap"
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.16),transparent_24%,transparent_72%,rgba(0,0,0,.16))]" />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" aria-hidden="true">
              <path d="M285 535 C360 510 423 520 492 575 C570 638 642 622 736 584" fill="none" stroke="rgba(250,204,21,.7)" strokeWidth="7" strokeDasharray="22 18" strokeLinecap="round" />
              <path d="M338 330 C410 370 475 360 548 405 C620 448 680 422 748 382" fill="none" stroke="rgba(250,204,21,.55)" strokeWidth="6" strokeDasharray="18 15" strokeLinecap="round" />
              <path d="M424 765 C484 703 550 704 615 746" fill="none" stroke="rgba(250,204,21,.55)" strokeWidth="6" strokeDasharray="18 15" strokeLinecap="round" />
            </svg>

            {regionLabels.map((region) => (
              <div key={region.name} className={cn("pointer-events-none absolute rounded bg-black/45 px-2 py-1 text-[10px] font-black uppercase text-white/75 shadow", region.className)}>
                {region.name}
              </div>
            ))}

            {visibleMarkers.map((marker) => {
              const type = normalizeType(marker.type);
              const meta = markerMeta[type];
              const Icon = meta.icon;
              const selected = selectedMarker?.id === marker.id;

              return (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarkerId(marker.id)}
                  className={cn(
                    "absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/70 font-bold shadow-[0_10px_34px_rgba(0,0,0,.55)] ring-4 transition hover:scale-110",
                    meta.color,
                    selected ? "scale-110 ring-white/70" : meta.ring
                  )}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                  aria-label={marker.name}
                  title={marker.name}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 max-w-[320px] rounded-md border border-white/10 bg-black/60 px-3 py-2 text-xs text-zinc-300 backdrop-blur">
              <div className="font-bold uppercase text-white">{text.operations}</div>
              <div className="mt-1 text-zinc-400">{text.subtitle}</div>
            </div>
          </div>
        </div>
      </div>

      {selectedMarker ? (
        <aside className="rounded-lg border border-white/10 bg-white/[.04] p-5 backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary">
            <Info className="h-4 w-4" />
            {text.selectedIntel}
          </div>
          <h2 className="mt-4 text-3xl font-black text-white">{selectedMarker.name}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={cn("inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-bold uppercase", markerMeta[normalizeType(selectedMarker.type)].color)}>
              {text.filters[normalizeType(selectedMarker.type)]}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold uppercase text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {Math.round(selectedMarker.x)} / {Math.round(selectedMarker.y)}
            </span>
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
            <div className="text-xs font-bold uppercase text-zinc-500">{text.risk}</div>
            <div className="mt-1 text-xl font-black text-white">{selectedMarker.risk}</div>
          </div>
          <p className="mt-5 text-sm leading-7 text-zinc-300">{selectedMarker.note}</p>

          <div className="mt-8 grid gap-3 text-sm text-zinc-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span>{text.visibleMarkers}</span>
              <span className="font-bold text-white">{visibleMarkers.length}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span>{text.activeFilters}</span>
              <span className="font-bold text-white">{activeTypes.length}/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{text.version}</span>
              <span className="font-bold text-white">{text.versionValue}</span>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-zinc-200">
            {text.source}
          </div>
        </aside>
      ) : null}
    </section>
  );
}
