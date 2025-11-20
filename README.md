# SCHNITTWERK Plattform

Digitale Plattform für SCHNITTWERK by Vanessa Carosella (Zürich). Next.js Full-Stack mit Supabase. Aktuell sind Phase 0-4 aus dem Codex umgesetzt: Scaffold, Schema, Design-System, Public Site, Buchungsengine, Kundenportal-Basics.

## Features
- Öffentliche Seiten: Home, Leistungen, Galerie (Stub), Über uns, Team, Kontakt (Formular), Shop-Listing, Termin buchen.
- Design System: Buttons, Inputs, Select, Cards, Badges, Dialog, Sheet, Toast, Skeleton, Table.
- Buchungsengine: Slot-Berechnung nach Regeln, Staff-Präferenz, Reservierungen via `/api/booking` mit Supabase oder In-Memory Fallback.
- Kundenportal: Login/Registrierung (Supabase vorbereitet), Terminübersicht.
- Supabase Schema: Kern-Tabellen + Seeds, RLS-Basics, Booking Rules.
- Tests: Vitest Slot-Engine Property Tests.

## Quickstart
1. `npm install`
2. `.env.local` aus `.env.example` füllen (Supabase Keys). Ohne Keys läuft Demo-Modus.
3. Optional Supabase lokal starten und Migration `supabase/migrations/0001_core_schema.sql` einspielen.
4. `npm run dev`
5. `npm test` für Slot-Engine.

Weitere Details siehe `architecture.md`, `dev-setup.md`, `data-model.md`, `security-and-rls.md`, aktualisierte `codex.md`.
