"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getBrowserSupabase } from "@/lib/supabaseClient";
import { getUpcomingAppointmentsForEmail } from "@/lib/booking";
import { Appointment } from "@/lib/types";
import { useToast } from "@/components/ui/toast";
import { format } from "date-fns";
import { de } from "date-fns/locale";

type Mode = "login" | "register";

export function KontoClient() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { push } = useToast();

  const isSupabaseReady = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  const loadAppointments = async (mail: string) => {
    if (!mail) return;
    const items = await getUpcomingAppointmentsForEmail(mail);
    setAppointments(items);
  };

  const handleAuth = async () => {
    setLoading(true);
    if (!isSupabaseReady) {
      push({ title: "Demo-Modus", description: "Supabase nicht konfiguriert – zeige Demo-Daten.", variant: "info" });
      loadAppointments(email);
      setLoading(false);
      return;
    }
    const supabase = getBrowserSupabase();
    const fn = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    setLoading(false);
    if (error) {
      push({ title: "Fehler", description: error.message, variant: "error" });
    } else {
      push({ title: "Erfolg", description: "Angemeldet", variant: "success" });
      loadAppointments(email);
    }
  };

  return (
    <div className="container grid gap-6 md:grid-cols-2">
      <Card>
        <p className="text-sm uppercase tracking-wide text-muted">Konto</p>
        <h1 className="text-2xl font-semibold text-[--color-secondary]">Anmelden oder registrieren</h1>
        <div className="mt-3 space-y-3">
          <Input placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Input
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="flex gap-3">
            <Button onClick={handleAuth} disabled={loading}>
              {mode === "login" ? "Login" : "Registrieren"}
            </Button>
            <Button variant="ghost" onClick={() => setMode(mode === "login" ? "register" : "login")}>\
              {mode === "login" ? "Neu hier? Registrieren" : "Schon Kunde? Login"}
            </Button>
          </div>
          {!isSupabaseReady && <p className="text-xs text-muted">Supabase Keys fehlen – Demo-Modus aktiv.</p>}
        </div>
      </Card>
      <Card>
        <p className="text-sm uppercase tracking-wide text-muted">Meine Termine</p>
        {appointments.length === 0 ? (
          <p className="text-muted">Keine Termine gefunden.</p>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => (
              <div key={appt.id} className="rounded-md border border-[--color-border] p-3 text-sm">
                <p className="font-semibold">{format(new Date(appt.start), "EEEE, dd.MM HH:mm", { locale: de })}</p>
                <p className="text-muted">Status: {appt.status}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
