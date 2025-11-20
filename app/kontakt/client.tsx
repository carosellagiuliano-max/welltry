"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";

export function KontaktClient() {
  const { push } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    const res = await fetch("/api/contact", { method: "POST", body: data });
    setLoading(false);
    if (res.ok) {
      push({ title: "Danke!", description: "Wir melden uns in Kürze.", variant: "success" });
      event.currentTarget.reset();
    } else {
      push({ title: "Fehler", description: "Bitte später erneut versuchen.", variant: "error" });
    }
  };

  return (
    <div className="container grid gap-8 md:grid-cols-2 md:items-start">
      <div className="surface p-6">
        <h1 className="text-3xl font-semibold text-[--color-secondary]">Kontakt</h1>
        <p className="mt-3 text-muted">Schreib uns dein Anliegen. Wir antworten dienstags bis samstags innerhalb eines Werktags.</p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <Input name="name" required placeholder="Name" />
          <Input name="email" type="email" required placeholder="E-Mail" />
          <Textarea name="message" required placeholder="Deine Nachricht" rows={4} />
          <Button type="submit" disabled={loading} className="btn-gradient">
            {loading ? "Senden..." : "Nachricht senden"}
          </Button>
        </form>
      </div>
      <div className="surface p-6">
        <h3 className="text-xl font-semibold">Salon</h3>
        <p className="text-muted">Limmatstrasse 12, 8005 Zürich</p>
        <p className="text-muted">Telefon: +41 44 000 00 00</p>
        <p className="text-muted">E-Mail: hello@schnittwerk.ch</p>
        <div className="mt-4 text-sm text-muted">
          <p>Parkplätze in der Nähe, ÖV: Tram 4/13 bis Limmatplatz.</p>
          <p>Online-Buchung bevorzugt, spontane Walk-ins nach Verfügbarkeit.</p>
        </div>
      </div>
    </div>
  );
}
