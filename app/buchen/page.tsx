import { getAppointments, getBookingRules, getServiceCatalog, getStaff, getStaffWorkingHours } from "@/lib/data";
import { type Slot } from "@/lib/slots";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Suspense } from "react";
import BookingFlow from "./booking-flow";

export const metadata = { title: "Termin buchen | SCHNITTWERK" };

async function fetchBookingData() {
  const [catalog, staff, windows, rules, appointments] = await Promise.all([
    getServiceCatalog(),
    getStaff(),
    getStaffWorkingHours(),
    getBookingRules(),
    getAppointments(),
  ]);
  return { catalog, staff, windows, rules, appointments };
}

export default async function BookingPage() {
  const data = await fetchBookingData();
  return (
    <div className="section">
      <div className="container flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted">Online Buchung</p>
          <h1 className="text-3xl font-semibold text-[--color-secondary]">Termin in vier Schritten</h1>
          <p className="text-muted">
            Auswahl, Mitarbeiter, Zeitfenster, Bestätigung. Slots werden live aus der Buchungslogik generiert und RLS-fähig
            gespeichert.
          </p>
        </div>
        <Suspense fallback={<p className="text-muted">Lade Buchungsdaten...</p>}>
          <BookingFlow {...data} />
        </Suspense>
      </div>
    </div>
  );
}

export function SlotList({ slots, onSelect, selected }: { slots: Slot[]; onSelect: (slot: Slot) => void; selected?: string }) {
  if (slots.length === 0) return <p className="text-sm text-muted">Keine Slots im gewählten Zeitraum.</p>;
  return (
    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {slots.map((slot) => {
        const start = new Date(slot.start);
        return (
          <button
            key={`${slot.staff_id}-${slot.start}`}
            onClick={() => onSelect(slot)}
            className={`rounded-md border px-3 py-2 text-left text-sm transition ${
              selected === slot.start ? "border-[--color-primary] bg-[--color-muted]" : "border-[--color-border]"
            }`}
          >
            <p className="font-semibold">{format(start, "EEE, dd.MM HH:mm", { locale: de })}</p>
            <p className="text-xs text-muted">mit {slot.staff_id}</p>
          </button>
        );
      })}
    </div>
  );
}
