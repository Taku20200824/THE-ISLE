import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dinosaurs } from "@/data/site";

export default function DinosaursPage() {
  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Dinosaurs" title="Playable dinosaur field guide" description="Every profile is structured for later game balance and wiki data integration." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dinosaurs.map((dino) => (
          <Link href={`/dinosaurs/${dino.slug}`} key={dino.slug}>
            <Card className="h-full transition hover:-translate-y-1 hover:border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {dino.name}
                  <ArrowRight className="h-4 w-4 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{dino.diet}</p>
                <p className="mt-2">{dino.strength}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
