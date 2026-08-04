import { Play, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const gallery = [
  { type: "Screenshot", title: "Sanctuary sunrise", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80" },
  { type: "Video", title: "Tournament final", image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80" },
  { type: "Community Creation", title: "Pack emblem", image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80" }
];

export default function GalleryPage() {
  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Gallery" title="Screenshots, videos, and creations" />
      <div className="grid gap-5 md:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.title} className="overflow-hidden">
            <div className="relative">
              <img src={item.image} alt="" className="h-64 w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
                {item.type}
              </div>
              {item.type === "Video" ? <Play className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white" /> : <Sparkles className="absolute bottom-4 right-4 h-6 w-6 text-primary" />}
            </div>
            <CardContent className="p-5 font-semibold">{item.title}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
