"use client";

import { ExternalLink, MapPinned } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

const gatewayMapUrl = "https://theisle.ru/en/maps?map=evrima&lat=0.0&lng=0.0&zoom=-1&hide_header=1";

const labels = {
  en: {
    eyebrow: "Map",
    title: "Gateway interactive map",
    description: "Use the live Evrima Gateway map for locations, rivers, sanctuaries, spawns, migration routes, and food points.",
    mapTitle: "TheIsle.ru Evrima Gateway",
    mapDescription: "Interactive community map embedded for quick in-game reference.",
    openMap: "Open full map",
    iframeTitle: "TheIsle.ru Evrima Gateway interactive map"
  },
  mn: {
    eyebrow: "Газрын зураг",
    title: "Gateway интерактив газрын зураг",
    description: "Evrima Gateway-ийн байршил, гол ус, sanctuary, spawn, migration route болон food point-уудыг эндээс харна.",
    mapTitle: "TheIsle.ru Evrima Gateway",
    mapDescription: "Тоглоомын үеэр хурдан лавлах интерактив community газрын зураг.",
    openMap: "Бүтэн map нээх",
    iframeTitle: "TheIsle.ru Evrima Gateway интерактив газрын зураг"
  },
  ja: {
    eyebrow: "マップ",
    title: "Gateway インタラクティブマップ",
    description: "Evrima Gateway の場所、川、水場、sanctuary、spawn、migration route、food point を確認できます。",
    mapTitle: "TheIsle.ru Evrima Gateway",
    mapDescription: "ゲーム中にすぐ確認できるコミュニティ用インタラクティブマップです。",
    openMap: "全画面で開く",
    iframeTitle: "TheIsle.ru Evrima Gateway インタラクティブマップ"
  },
  ko: {
    eyebrow: "지도",
    title: "Gateway 인터랙티브 지도",
    description: "Evrima Gateway의 위치, 강과 물, sanctuary, spawn, migration route, food point를 확인할 수 있습니다.",
    mapTitle: "TheIsle.ru Evrima Gateway",
    mapDescription: "게임 중 빠르게 참고할 수 있는 커뮤니티 인터랙티브 지도입니다.",
    openMap: "전체 지도 열기",
    iframeTitle: "TheIsle.ru Evrima Gateway 인터랙티브 지도"
  }
};

export function MapPageContent() {
  const { locale } = useLanguage();
  const text = labels[locale];

  return (
    <main className="container min-h-screen pt-28 pb-16 sm:pt-32">
      <SectionHeading
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      />

      <section className="overflow-hidden rounded-lg border border-white/10 bg-black/35 shadow-[0_24px_80px_rgba(0,0,0,.35)]">
        <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[.03] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-primary/25 bg-primary/10 p-2 text-primary">
              <MapPinned className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-black text-white">{text.mapTitle}</h2>
              <p className="text-sm text-muted-foreground">{text.mapDescription}</p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <a href={gatewayMapUrl} target="_blank" rel="noopener noreferrer">
              {text.openMap}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="h-[78vh] min-h-[620px] bg-black">
          <iframe
            src={gatewayMapUrl}
            title={text.iframeTitle}
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
