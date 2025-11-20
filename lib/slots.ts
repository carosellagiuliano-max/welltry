import {
  addDays,
  addMinutes,
  areIntervalsOverlapping,
  differenceInCalendarDays,
  formatISO,
  isAfter,
  startOfDay,
} from "date-fns";
import { Appointment, BookingRule, StaffWorkingWindow } from "./types";

export type Slot = {
  start: string;
  end: string;
  staff_id: string;
};

function intervalFromMinutes(date: Date, startMinutes: number, endMinutes: number) {
  const start = addMinutes(startOfDay(date), startMinutes);
  const end = addMinutes(startOfDay(date), endMinutes);
  return { start, end };
}

function isBlocked(interval: { start: Date; end: Date }, appointments: Appointment[]) {
  return appointments.some((appt) =>
    areIntervalsOverlapping(interval, { start: new Date(appt.start), end: new Date(appt.end) }, { inclusive: true })
  );
}

export function generateSlotsForWindow(
  date: Date,
  window: StaffWorkingWindow,
  rule: BookingRule,
  appointments: Appointment[],
  serviceDuration: number
): Slot[] {
  const slots: Slot[] = [];
  const now = new Date();
  const minStart = addMinutes(now, rule.min_lead_time_minutes);
  const interval = intervalFromMinutes(date, window.start_minutes, window.end_minutes);

  for (let cursor = interval.start; isAfter(interval.end, cursor); cursor = addMinutes(cursor, rule.slot_granularity_minutes)) {
    const slotStart = cursor;
    const slotEnd = addMinutes(cursor, serviceDuration + rule.default_visit_buffer_minutes);
    if (slotEnd > interval.end) break;
    if (isAfter(minStart, slotStart)) continue;
    if (differenceInCalendarDays(slotStart, now) > rule.max_booking_horizon_days) break;

    const proposed = { start: slotStart, end: slotEnd };
    if (isBlocked(proposed, appointments)) continue;
    slots.push({ start: formatISO(slotStart), end: formatISO(slotEnd), staff_id: window.staff_id });
  }
  return slots;
}

export function generateSlots(
  date: Date,
  windows: StaffWorkingWindow[],
  rule: BookingRule,
  appointments: Appointment[],
  serviceDuration: number
) {
  return windows
    .filter((w) => w.day === date.getDay())
    .flatMap((window) => generateSlotsForWindow(date, window, rule, appointments, serviceDuration));
}

export function generateHorizonSlots(
  startDate: Date,
  days: number,
  windows: StaffWorkingWindow[],
  rule: BookingRule,
  appointments: Appointment[],
  serviceDuration: number
) {
  const allSlots: Slot[] = [];
  for (let i = 0; i <= days; i++) {
    const date = addDays(startDate, i);
    allSlots.push(...generateSlots(date, windows, rule, appointments, serviceDuration));
  }
  return allSlots;
}
