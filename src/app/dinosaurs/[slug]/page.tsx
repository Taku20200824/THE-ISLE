import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getFirestoreDinosaur, getFirestoreDinosaurs } from "@/lib/firebase/firestore-data";
import { getDinosaurImage } from "@/lib/dinosaur-images";
import { LocalizedText } from "@/components/localized-text";
import type { TranslationKey } from "@/lib/i18n";

export async function generateStaticParams() {
  const dinosaurs = await getFirestoreDinosaurs();
  return dinosaurs.map((dino) => ({ slug: dino.slug }));
}

type DinosaurPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DinosaurPageProps) {
  const { slug } = await params;
  const dino = await getFirestoreDinosaur(slug);
  return {
    title: dino ? dino.name : "Dinosaur"
  };
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DinosaurPage({ params }: DinosaurPageProps) {
  const { slug } = await params;
  const dino = await getFirestoreDinosaur(slug);

  if (!dino) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <section className="relative min-h-[54vh] overflow-hidden">
        <img
          src={getDinosaurImage(dino.slug, dino.image)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-background" />
        <div className="container relative z-10 flex min-h-[54vh] items-center">
          <div className="max-w-3xl">
            <Badge>{dino.diet}</Badge>
            <h1 className="mt-5 font-display text-5xl font-black sm:text-7xl">{dino.name}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{dino.playstyle}</p>
          </div>
        </div>
      </section>
      <section className="container grid gap-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["dino.status", dino.status ?? "Playable"],
          ["dino.role", dino.role ?? dino.diet],
          ["dino.difficulty", dino.difficulty ?? "Standard"],
          ["dino.growthTime", dino.growth],
          ["dino.strength", dino.strength],
          ["dino.weakness", dino.weakness],
          ["dino.playstyle", dino.playstyle]
        ].map(([labelKey, value]) => (
          <Card key={labelKey}>
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground"><LocalizedText tKey={labelKey as TranslationKey} /></div>
              <div className="mt-2 font-semibold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
