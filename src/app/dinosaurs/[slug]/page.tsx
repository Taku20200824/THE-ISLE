import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { dinosaurs } from "@/data/site";

export function generateStaticParams() {
  return dinosaurs.map((dino) => ({ slug: dino.slug }));
}

type DinosaurPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DinosaurPageProps) {
  const { slug } = await params;
  const dino = dinosaurs.find((item) => item.slug === slug);
  return {
    title: dino ? dino.name : "Dinosaur"
  };
}

export default async function DinosaurPage({ params }: DinosaurPageProps) {
  const { slug } = await params;
  const dino = dinosaurs.find((item) => item.slug === slug);

  if (!dino) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <section className="relative min-h-[54vh] overflow-hidden">
        <img
          src={dino.image ?? "https://images.unsplash.com/photo-1532297212754-b6c6cc2e2a08?auto=format&fit=crop&w=1600&q=85"}
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
          ["Growth Time", dino.growth],
          ["Strength", dino.strength],
          ["Weakness", dino.weakness],
          ["Recommended Playstyle", dino.playstyle]
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="text-sm text-muted-foreground">{label}</div>
              <div className="mt-2 font-semibold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
