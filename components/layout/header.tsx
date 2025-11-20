"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/team", label: "Team" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/shop", label: "Shop" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-[--color-border] bg-[--color-background]/85 backdrop-blur">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-xl font-semibold">
          SCHNITTWERK
        </Link>
        <nav className="flex flex-1 flex-wrap items-center justify-center gap-3 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-2 py-1 text-muted transition hover:text-[--color-foreground]",
                pathname === link.href && "font-semibold text-[--color-foreground]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/konto" className="text-sm font-medium text-muted hover:text-[--color-foreground]">
            Mein Konto
          </Link>
          <Button asChild size="sm">
            <Link href="/buchen">Termin buchen</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
