import type { MetadataRoute } from "next";
import { dinosaurs, navItems, siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...navItems.map((item) => item.href),
    "/gallery",
    "/staff",
    "/contact",
    ...dinosaurs.map((dino) => `/dinosaurs/${dino.slug}`)
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7
  }));
}
