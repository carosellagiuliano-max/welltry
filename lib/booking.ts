import { addHours, isAfter } from "date-fns";
import { v4 as uuid } from "uuid";
import { getBrowserSupabase, getServerSupabase } from "./supabaseClient";
import { Appointment, BookingRule } from "./types";
import { bookingRules as fallbackRules, sampleAppointments } from "./mock-data";
import { isSupabaseConfigured } from "./utils";

const memoryReservations = new Map<string, Appointment>();
sampleAppointments.forEach((appt) => memoryReservations.set(appt.id, appt));

export type ReservationPayload = {
  staff_id: string;
  start: string;
  end: string;
  customer_email?: string;
};

export async function createReservation(payload: ReservationPayload) {
  if (isSupabaseConfigured()) {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        staff_id: payload.staff_id,
        start_time: payload.start,
        end_time: payload.end,
        status: "reserved",
        customer_email: payload.customer_email,
      })
      .select()
      .single();
    if (error) throw error;
    return data as Appointment;
  }
  const id = uuid();
  const reservation: Appointment = { id, staff_id: payload.staff_id, start: payload.start, end: payload.end, status: "reserved" };
  memoryReservations.set(id, reservation);
  return reservation;
}

export async function cancelReservation(id: string, rules: BookingRule = fallbackRules) {
  if (isSupabaseConfigured()) {
    const supabase = getServerSupabase();
    const { data } = await supabase.from("appointments").select("start_time:start").eq("id", id).single();
    const start = data?.start as string | undefined;
    if (!start) return;
    if (isAfter(new Date(), addHours(new Date(start), -rules.cancellation_cutoff_hours))) return;
    await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
    return;
  }
  const appt = memoryReservations.get(id);
  if (!appt) return;
  if (isAfter(new Date(), addHours(new Date(appt.start), -rules.cancellation_cutoff_hours))) return;
  memoryReservations.set(id, { ...appt, status: "cancelled" });
}

export async function getUpcomingAppointmentsForEmail(email: string) {
  if (isSupabaseConfigured()) {
    const supabase = getBrowserSupabase();
    const { data } = await supabase
      .from("appointments")
      .select("id,staff_id,start_time:start,end_time:end,status")
      .gt("start_time", new Date().toISOString())
      .eq("customer_email", email);
    return (data as Appointment[]) ?? [];
  }
  return Array.from(memoryReservations.values()).filter((appt) => appt.status !== "cancelled");
}
