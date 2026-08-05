"use client";

import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { navItems, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 font-display text-lg font-black tracking-normal text-primary">
          <span className="h-3 w-3 rounded-sm border border-primary/80 bg-primary shadow-[0_0_22px_rgba(45,212,191,.75)] transition group-hover:rotate-45" />
          <span className="drop-shadow-[0_0_18px_rgba(45,212,191,.35)]">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative transition hover:text-foreground after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            <Sun className="h-4 w-4 scale-100 rotate-0 transition dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition dark:scale-100 dark:rotate-0" />
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <a href={siteConfig.discordInvite}>Join Discord</a>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
