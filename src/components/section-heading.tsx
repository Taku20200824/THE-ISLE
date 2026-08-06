"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import type { TranslationKey } from "@/lib/i18n";

export function SectionHeading({
  eyebrow,
  title,
  description,
  eyebrowKey,
  titleKey,
  descriptionKey
}: {
  eyebrow: string;
  title: string;
  description?: string;
  eyebrowKey?: TranslationKey;
  titleKey?: TranslationKey;
  descriptionKey?: TranslationKey;
}) {
  const { t } = useLanguage();
  const renderedEyebrow = eyebrowKey ? t(eyebrowKey) : eyebrow;
  const renderedTitle = titleKey ? t(titleKey) : title;
  const renderedDescription = descriptionKey ? t(descriptionKey) : description;

  return (
    <div className="mb-8 max-w-3xl">
      <Badge>{renderedEyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl">{renderedTitle}</h2>
      {renderedDescription ? <p className="mt-3 text-muted-foreground">{renderedDescription}</p> : null}
    </div>
  );
}
