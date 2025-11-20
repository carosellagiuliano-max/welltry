"use client";

import { useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { de } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SlotList } from "./page";
import { generateHorizonSlots } from "@/lib/slots";
import { useToast } from "@/components/ui/toast";
import { BookingRule, Service, StaffMember, StaffWorkingWindow } from "@/lib/types";
import { Appointment } from "@/lib/types";

interface Props {
  catalog: { services: Service[] };
  staff: StaffMember[];
  windows: StaffWorkingWindow[];
  rules: BookingRule;
  appointments: Appointment[];
}

export default function BookingFlow({ catalog, staff, windows, rules, appointments }: Props) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [selectedStaffId, setSelectedStaffId] = useState<string | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string; staff_id: string } | undefined>();
  const [email, setEmail] = useState("");
  const { push } = useToast();

  const selectedService = catalog.services.find((s) => s.id === selectedServiceId);

  const slots = useMemo(() => {
    if (!selectedService) return [];
    const filteredAppointments = selectedStaffId
      ? appointments.filter((appt) => appt.staff_id === selectedStaffId)
      : appointments;
    const horizonSlots = generateHorizonSlots(new Date(), 7, windows, rules, filteredAppointments, selectedService.duration_minutes);
    return selectedStaffId ? horizonSlots.filter((slot) => slot.staff_id === selectedStaffId) : horizonSlots;
  }, [appointments, rules, selectedService, selectedStaffId, windows]);

  const step = selectedSlot ? 4 : selectedStaffId ? 3 : selectedService ? 2 : 1;

  const handleReservation = async () => {
    if (!selectedSlot || !selectedService) return;
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...selectedSlot, email }),
    });
    if (res.ok) {
      push({ title: "Reserviert", description: "Bestätigung folgt per E-Mail.", variant: "success" });
      setSelectedSlot(undefined);
      setSelectedServiceId(undefined);
      setSelectedStaffId(undefined);
      setEmail("");
    } else {
      const data = await res.json();
      push({ title: "Fehler", description: data.error ?? "Bitte erneut versuchen", variant: "error" });
    }
  };

  return (
    <div className="grid gap-5">
      <Card>
        <p className="text-xs uppercase tracking-wide text-muted">Schritt {step} von 4</p>
        <h3 className="text-xl font-semibold">Leistung wählen</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {catalog.services.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setSelectedServiceId(service.id);
                setSelectedSlot(undefined);
              }}
              className={`rounded-md border p-3 text-left transition ${
                selectedServiceId === service.id ? "border-[--color-primary] bg-[--color-muted]" : "border-[--color-border]"
              }`}
            >
              <p className="font-semibold">{service.name}</p>
              <p className="text-xs text-muted">{service.duration_minutes} min • CHF {service.base_price_chf}</p>
            </button>
          ))}
        </div>
      </Card>

      {selectedService && (
        <Card>
          <p className="text-xs uppercase tracking-wide text-muted">Schritt 2</p>
          <h3 className="text-xl font-semibold">Team wählen</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button
              variant={selectedStaffId ? "ghost" : "primary"}
              onClick={() => setSelectedStaffId(undefined)}
              size="sm"
            >
              Keine Präferenz
            </Button>
            {staff.map((member) => (
              <Button
                key={member.id}
                variant={selectedStaffId === member.id ? "primary" : "ghost"}
                onClick={() => setSelectedStaffId(member.id)}
                size="sm"
              >
                {member.name}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {selectedService && (
        <Card>
          <p className="text-xs uppercase tracking-wide text-muted">Schritt 3</p>
          <h3 className="text-xl font-semibold">Slot wählen</h3>
          <p className="text-sm text-muted">Zeithorizont: heute bis {format(addDays(new Date(), 7), "dd.MM.", { locale: de })}</p>
          <div className="mt-4">
            <SlotList slots={slots} onSelect={setSelectedSlot} selected={selectedSlot?.start} />
          </div>
        </Card>
      )}

      {selectedSlot && selectedService && (
        <Card>
          <p className="text-xs uppercase tracking-wide text-muted">Schritt 4</p>
          <h3 className="text-xl font-semibold">Bestätigen</h3>
          <p className="text-sm text-muted">
            Wir halten den Slot 15 Minuten reserviert. Bitte E-Mail angeben, damit die Bestätigung versendet werden kann.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-[--color-border] bg-[--color-muted]/40 p-3 text-sm">
              <p className="font-semibold">{selectedService.name}</p>
              <p className="text-muted">
                {format(new Date(selectedSlot.start), "EEEE, dd.MM HH:mm", { locale: de })} mit {selectedSlot.staff_id}
              </p>
            </div>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail für Bestätigung"
              type="email"
              required
            />
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={handleReservation}>Buchung bestätigen</Button>
            <Button variant="ghost" onClick={() => setSelectedSlot(undefined)}>
              Slot ändern
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
