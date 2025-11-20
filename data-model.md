# Datenmodell (Phase 1)

- **salons**: Stammdaten des Salons (Name, Adresse, Kontakt, hero_copy).
- **profiles**: 1:1 zu `auth.users`, speichert E-Mail & Name.
- **roles / user_roles**: Einfaches RBAC (admin, staff, customer).
- **customers**: Kundenstammdaten, referenziert profiles + salon.
- **staff**: Mitarbeitende inkl. Skills (Textarray) und Salonbindung.
- **service_categories / services**: Strukturierte Leistungen mit Dauer und Basispreis.
- **service_prices**: Preis-Historie mit `valid_from` (für spätere Preissprünge).
- **opening_hours**: Offene Zeiten pro Wochentag (Text HH:MM zur einfachen Darstellung).
- **staff_working_hours**: Minuten seit Mitternacht, Tag 0-6, verhindert DST-Drift.
- **booking_rules**: Per Salon konfigurierbare Regeln (Lead Time, Horizon, Slotgröße, Buffer, Cancellation Cutoff).
- **appointments**: Buchungen/Reservierungen mit Status (`reserved`, `confirmed`, `cancelled`), Snapshots von start/end + Staff + Email.

Weitere Modelle aus Codex (Produkte, Payments etc.) folgen ab Phase 5/6.
