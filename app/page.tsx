import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getOpeningHours, getSalonInfo, getServiceCatalog } from "@/lib/data";
import Link from "next/link";

export default async function Home() {
  const [salon, openingHours, catalog] = await Promise.all([
    getSalonInfo(),
    getOpeningHours(),
    getServiceCatalog(),
  ]);
  const topServices = catalog.services.slice(0, 3);
  return (
    <div>
      <section className="section bg-white">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-6">
            <Badge>Neu: Online Buchung & Shop</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-[--color-secondary]">
              {salon.name}: präzise Schnitte, gesunde Farbe, herzlicher Service.
            </h1>
            <p className="text-lg text-muted">{salon.heroCopy}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="btn-gradient shadow-lg">
                <Link href="/buchen">Termin buchen</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/shop">Produkte entdecken</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-muted">
              <div>
                <p className="font-semibold text-[--color-foreground]">Adresse</p>
                <p>{salon.address}</p>
              </div>
              <div>
                <p className="font-semibold text-[--color-foreground]">Kontakt</p>
                <p>{salon.phone}</p>
                <p>{salon.email}</p>
              </div>
            </div>
          </div>
          <div className="surface p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Öffnungszeiten</h3>
            <div className="mt-3 divide-y divide-[--color-border]">
              {openingHours.map((entry) => (
                <div key={entry.day} className="flex items-center justify-between py-2 text-sm">
                  <span>{entry.day}</span>
                  <span className="text-muted">
                    {entry.open} – {entry.close}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">Spontane Termine auf Anfrage – wir antworten innerhalb weniger Stunden.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-wide text-muted">Leistungen</p>
            <h2 className="text-3xl font-semibold text-[--color-secondary]">Was wir besonders gut können</h2>
            <p className="text-muted">Alle Preise beinhalten Beratung, hochwertige Produkte und ruhige Atmosphäre.</p>
          </div>
          <div className="card-grid">
            {topServices.map((service) => (
              <Card key={service.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-muted">
                      {catalog.categories.find((c) => c.id === service.category_id)?.name}
                    </p>
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                  </div>
                  <Badge variant="outline">CHF {service.base_price_chf}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted">{service.description}</p>
                <p className="mt-4 text-xs text-muted">Dauer ca. {service.duration_minutes} Minuten</p>
              </Card>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/leistungen">Alle Leistungen ansehen</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/buchen">Direkt Termin finden</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid gap-8 md:grid-cols-2 md:items-center">
          <div className="surface p-6">
            <h3 className="text-xl font-semibold">Warum SCHNITTWERK?</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>• Präzise Zeitfenster – wir vermeiden Wartezeiten.</li>
              <li>• Swiss made Produkte mit Fokus auf Gesundheit.</li>
              <li>• Digitalisierung mit Supabase & Stripe, DSG/DSGVO-konform.</li>
              <li>• Ein Team, das zuhört und transparent berät.</li>
            </ul>
          </div>
          <div className="surface p-6">
            <h3 className="text-xl font-semibold">Digitaler Überblick</h3>
            <p className="text-muted">
              Kundenportal, E-Mail Bestätigungen, Buchungsengine mit RLS abgesichert – Phase 0-4 ist fertig
              umgesetzt und bereit für echte Buchungen.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="soft">DSG / DSGVO-ready</Badge>
              <Badge variant="soft">Stripe vorbereitet</Badge>
              <Badge variant="soft">Supabase Schema</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
