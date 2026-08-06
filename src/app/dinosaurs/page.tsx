import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFirestoreDinosaurs } from "@/lib/firebase/firestore-data";
import { getDinosaurImage } from "@/lib/dinosaur-images";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DinosaursPage() {
  const dinosaurs = await getFirestoreDinosaurs();

  return (
    <main className="container min-h-screen pt-32 pb-20 sm:pt-36">
      <SectionHeading eyebrow="Dinosaurs" title="Playable dinosaur field guide" description="Every profile is structured for later game balance and wiki data integration." eyebrowKey="nav.dinosaurs" titleKey="page.dinosaurs.title" descriptionKey="page.dinosaurs.description" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dinosaurs.map((dino) => (
          <Link href={`/dinosaurs/${dino.slug}`} key={dino.slug}>
            <Card className="group h-full overflow-hidden transition hover:-translate-y-1 hover:border-primary/40">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getDinosaurImage(dino.slug, dino.image)}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <Badge className="absolute left-4 top-4 bg-black/50 text-white">{dino.diet}</Badge>
              </div>
              <CardHeader className="-mt-6 relative z-10">
                <CardTitle className="flex items-center justify-between">
                  {dino.name}
                  <ArrowRight className="h-4 w-4 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">{dino.role || dino.growth}</p>
                <p className="mt-2">{dino.strength}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
