"use client";

import type { ComponentType } from "react";
import { CalendarDays, Sparkles, Swords } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/lib/i18n";

type EventItem = {
  title: string;
  type: string;
  when: string;
  icon: string | ComponentType<{ className?: string }>;
  i18n?: Partial<Record<Locale, Partial<Pick<EventItem, "title" | "type" | "when">>>>;
};

const eventIcons = { CalendarDays, Sparkles, Swords };

const eventText: Record<string, Partial<Record<Locale, Pick<EventItem, "title" | "type" | "when">>>> = {
  "Weekly Herd Run": {
    ja: { title: "週間ハードラン", type: "週間イベント", when: "毎週水曜 21:00 JST" },
    ko: { title: "주간 무리 이동", type: "주간 이벤트", when: "매주 수요일 21:00 JST" },
    mn: { title: "Долоо хоногийн сүргийн гүйлт", type: "Долоо хоногийн эвент", when: "Лхагва бүр 21:00 JST" }
  },
  "Double Growth Weekend": {
    ja: { title: "成長2倍ウィークエンド", type: "成長ブースト", when: "承認された週末イベントごと" },
    ko: { title: "성장 2배 주말", type: "성장 부스트", when: "승인된 커뮤니티 주말마다" },
    mn: { title: "Өсөлт 2 дахин Weekend", type: "Өсөлтийн boost", when: "Зөвшөөрсөн community weekend бүр" }
  },
  "PvP Tournament": {
    ja: { title: "PvP トーナメント", type: "競技イベント", when: "毎月日曜 20:00 JST" },
    ko: { title: "PvP 토너먼트", type: "경쟁 이벤트", when: "매월 일요일 20:00 JST" },
    mn: { title: "PvP Tournament", type: "Өрсөлдөөнт эвент", when: "Сар бүрийн Ням 20:00 JST" }
  }
};

const dayLabels: Record<Locale, string[]> = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  ko: ["월", "화", "수", "목", "금", "토", "일"],
  mn: ["Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям", "Ням"]
};

function localizeEvent(event: EventItem, locale: Locale): EventItem {
  return {
    ...event,
    ...(eventText[event.title]?.[locale] ?? {}),
    ...(event.i18n?.[locale] ?? {})
  };
}

export function EventsContent({ events }: { events: EventItem[] }) {
  const { locale } = useLanguage();
  const days = dayLabels[locale];
  const weekly = eventText["Weekly Herd Run"][locale]?.title ?? "Weekly Herd Run";
  const growth = eventText["Double Growth Weekend"][locale]?.title ?? "Double Growth";

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {events.map((rawEvent) => {
          const event = localizeEvent(rawEvent, locale);
          const Icon = typeof rawEvent.icon === "string" ? eventIcons[rawEvent.icon as keyof typeof eventIcons] ?? CalendarDays : rawEvent.icon;

          return (
            <Card key={rawEvent.title} className="min-w-0">
              <CardHeader>
                <Icon className="h-7 w-7 text-primary" />
                <CardTitle className="break-words leading-snug">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="break-words text-sm text-muted-foreground">{event.type}</div>
                <div className="mt-2 break-words font-semibold">{event.when}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card className="mt-8 overflow-hidden">
        <CardContent className="grid gap-2 p-5 sm:grid-cols-7">
          {days.map((day, index) => (
            <div key={day} className="min-h-28 min-w-0 rounded-md border border-white/10 bg-white/[0.03] p-3">
              <div className="text-sm font-semibold">{day}</div>
              {index === 2 ? <p className="mt-4 break-words text-xs text-primary">{weekly}</p> : null}
              {index >= 4 ? <p className="mt-4 break-words text-xs text-secondary">{growth}</p> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
