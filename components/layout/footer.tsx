import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[--color-border] bg-white py-8">
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">SCHNITTWERK by Vanessa Carosella</p>
          <p className="text-sm text-muted">Limmatstrasse 12, 8005 Zürich</p>
          <p className="text-sm text-muted">Dienstag - Samstag nach Termin</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <Link href="tel:+41440000000" className="flex items-center gap-2 hover:text-[--color-foreground]">
            <Phone className="h-4 w-4" /> +41 44 000 00 00
          </Link>
          <Link href="mailto:hello@schnittwerk.ch" className="flex items-center gap-2 hover:text-[--color-foreground]">
            <Mail className="h-4 w-4" /> hello@schnittwerk.ch
          </Link>
          <p>© {new Date().getFullYear()} SCHNITTWERK – gepflegt mit Liebe und Präzision.</p>
        </div>
      </div>
    </footer>
  );
}
