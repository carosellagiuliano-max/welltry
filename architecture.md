# Architekturübersicht

- **Framework**: Next.js 16 (App Router) mit TypeScript und Tailwind v4 für Styling.
- **UI**: Eigenes kleines Design-System (Button, Input, Select, Badge, Card, Dialog, Sheet, Toast, Skeleton, Table) angelehnt an shadcn ui.
- **Backend/DB**: Supabase Postgres. Kernschema in `supabase/migrations/0001_core_schema.sql` mit RLS vorbereitet.
- **Auth**: Supabase Email/Passwort vorbereitet via `@supabase/ssr`. Kundenportal nutzt Browser-Client, falls keine Keys gesetzt fällt es in Demo-Modus zurück.
- **Booking Engine**: Slot-Generator in `lib/slots.ts` + Reservierungs-API `app/api/booking/route.ts`. Businessregeln in `lib/booking.ts` und `lib/data.ts`.
- **Public Site**: Marketingseiten in `app/` (Home, Leistungen, Galerie Stub, Über uns, Team, Kontakt, Shop, Buchen, Konto).
- **Styling**: Tokens in `app/globals.css`, responsive Layout mit Header/Footer und Container-Utility.
- **Docs**: Projekt-Setup in `dev-setup.md`, Datenmodell in `data-model.md`, Sicherheit/RLS in `security-and-rls.md`, Phase-Status im aktualisierten `codex.md`.
- **Tests**: Vitest für Slot-Engine (`tests/slots.test.ts`).

## Datenflüsse
- Server Components laden Daten über `lib/data.ts`, greifen auf Supabase zu, fallen bei fehlender Konfiguration auf Mock-Daten in `lib/mock-data.ts` zurück.
- Client-Interaktionen (Buchungsflow, Kontaktformular, Konto-Login) sprechen API-Routen (`/api/booking`, `/api/contact`) oder Supabase direkt an.
- Reservierungen speichern Snapshots (`appointments`-Tabelle) mit Status `reserved` und werden später per E-Mail bestätigt (Phase 5 erweitert um Stripe/Resend).
