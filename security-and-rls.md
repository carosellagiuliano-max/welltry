# Sicherheit & RLS (Phase 1)

- **RLS aktiviert** auf allen Kerntabellen (`salons`, `profiles`, `customers`, `staff`, `service_categories`, `services`, `opening_hours`, `staff_working_hours`, `booking_rules`, `appointments`).
- **Policies**
  - Marketing-Lesen: Öffentliche Select-Policies für Salons, Opening Hours, Services & Kategorien, um die Website ohne Auth zu befüllen.
  - Profile: Nutzer sieht nur sein eigenes Profil (`auth.uid() = id`).
  - Customers: Zugriff nur auf Zeilen mit `profile_id = auth.uid()`.
  - Appointments: Select erlaubt, wenn zugehöriger Staff existiert (wird später verfeinert auf salon_id und Kundenbezug).
- **Auth-Flows**: Supabase Email/Passwort vorbereitet; Client-Komponenten prüfen, ob Keys fehlen und fallen auf Demo zurück.
- **Data Residency**: Timestamps als `timestamptz` in UTC, Anzeige mit `Europe/Zurich` (siehe `lib/utils.ts`).
- **Idempotenz**: Reservierungs-API kapselt Insert; spätere Stripe/Webhook Idempotenz folgt in Phase 5.
- **PII**: Kunden-E-Mail in Appointments; bei echter Nutzung nur Server-Umgebung mit RLS und TLS.
