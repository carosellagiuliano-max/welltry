# Dev Setup

1) Node 20+, npm installiert.
2) `npm install`
3) Environment setzen: `.env.local` basierend auf `.env.example` mit `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4) Supabase lokal (optional): `supabase start`, dann Migration einspielen: `supabase db reset --use-mig-dir supabase/migrations`.
5) Dev-Server: `npm run dev` -> http://localhost:3000
6) Tests: `npm test` (Vitest, Slot-Engine).

## Supabase Auth
- Auth läuft über `@supabase/ssr`. Im Demo-Modus (ohne Keys) funktionieren Marketingseiten und Buchungsflow mit In-Memory-Reservierungen.
- Für echte Anmeldung müssen die Supabase Keys gesetzt sein; der Kundenbereich nutzt den Browser-Client.

## Design Tokens
- Tailwind v4 ohne Config, Tokens in `app/globals.css` definiert.

## Was fertig ist (Phasen 0-4)
- Next.js + Tailwind Scaffold, Layout, Design-System.
- Supabase Schema inkl. Seeds und RLS-Basics.
- Öffentliche Seiten und Kontaktformular (Stub API, später Resend/Stripe).
- Buchungsengine mit Slot-Berechnung, Reservierung über API.
- Kundenportal mit Login/Registrierung vorbereitet und Terminübersicht.
