import { describe, expect, it } from "vitest";
import { addMinutes, startOfDay } from "date-fns";
import { generateSlotsForWindow, generateHorizonSlots } from "@/lib/slots";
import { bookingRules, staffWorkingHours, sampleAppointments } from "@/lib/mock-data";

const window = staffWorkingHours[0];

describe("slot engine", () => {
  it("respects lead time and buffer", () => {
    const today = startOfDay(new Date());
    const slots = generateSlotsForWindow(today, window, bookingRules, [], 60);
    expect(slots.every((slot) => new Date(slot.start) > addMinutes(new Date(), bookingRules.min_lead_time_minutes - 1))).toBe(
      true
    );
  });

  it("excludes overlapping appointments", () => {
    const today = startOfDay(new Date());
    const slots = generateSlotsForWindow(today, window, bookingRules, sampleAppointments, 60);
    const overlap = slots.some((slot) => {
      const start = new Date(slot.start).getTime();
      const existingStart = new Date(sampleAppointments[0].start).getTime();
      return Math.abs(start - existingStart) < 1000 * 60 * 60; // within hour
    });
    expect(overlap).toBe(false);
  });

  it("enforces booking horizon", () => {
    const horizonSlots = generateHorizonSlots(startOfDay(new Date()), 40, [window], bookingRules, [], 30);
    const maxDays = bookingRules.max_booking_horizon_days;
    const outOfRange = horizonSlots.some(
      (slot) => (new Date(slot.start).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) > maxDays
    );
    expect(outOfRange).toBe(false);
  });
});
