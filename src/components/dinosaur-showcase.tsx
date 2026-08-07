"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, Footprints, ShieldAlert, UsersRound } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const showcaseImages = {
  jungle: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/376210/extras/7391d561e59518f462ff4a31bb922bc0.avif?t=1653237914",
  rex: "https://www.theisle.info/Tyrannosaurus.webp",
  deino: "https://www.theisle.info/deinosucus.jpg",
  stego: "https://www.theisle.info/The_isle_stegosaurus_new_2020.webp"
};

export function DinosaurShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rexY = useTransform(scrollYProgress, [0, 1], [90, -70]);
  const rexScale = useTransform(scrollYProgress, [0, 0.48, 1], [0.92, 1.1, 1.24]);
  const deinoX = useTransform(scrollYProgress, [0, 1], [-80, 40]);
  const stegoY = useTransform(scrollYProgress, [0, 1], [44, -22]);

  const moments = [
    { icon: Footprints, title: t("showcase.trackTitle"), body: t("showcase.trackBody") },
    { icon: ShieldAlert, title: t("showcase.surviveTitle"), body: t("showcase.surviveBody") },
    { icon: UsersRound, title: t("showcase.packTitle"), body: t("showcase.packBody") }
  ];

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden border-y border-white/10 bg-black py-24 sm:py-28">
      <img
        src={showcaseImages.jungle}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-110 object-cover opacity-35 saturate-125 blur-[1px]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(20,184,166,.24),transparent_30%),linear-gradient(180deg,rgba(3,7,6,.96),rgba(4,13,12,.84)_45%,rgba(2,6,5,.98))]" />
      <motion.img
        src={showcaseImages.rex}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-0 z-0 h-[58rem] max-h-none w-auto origin-center opacity-80 saturate-125 drop-shadow-[0_60px_80px_rgba(0,0,0,.8)] md:-right-16"
        style={{ y: rexY, scale: rexScale, rotateY: -10 }}
      />
      <motion.img
        src={showcaseImages.deino}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-0 z-0 h-64 w-[34rem] rounded-none object-cover opacity-45 blur-[1px] saturate-125 [mask-image:linear-gradient(90deg,black,transparent)] sm:h-80"
        style={{ x: deinoX }}
      />
      <motion.img
        src={showcaseImages.stego}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-[18%] z-0 hidden h-44 w-80 object-contain opacity-55 drop-shadow-[0_30px_50px_rgba(0,0,0,.7)] lg:block"
        style={{ y: stegoY }}
      />
      <div className="scanlines" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold uppercase text-primary backdrop-blur">
            <Eye className="h-4 w-4" />
            {t("showcase.eyebrow")}
          </div>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-black leading-none text-white drop-shadow-[0_0_34px_rgba(20,184,166,.2)] sm:text-6xl">
            {t("showcase.title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
            {t("showcase.body")}
          </p>
        </div>

        <div className="mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
          {moments.map(({ icon: Icon, title, body }) => (
            <article key={title} className="hud-card min-h-52 rounded-md p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
