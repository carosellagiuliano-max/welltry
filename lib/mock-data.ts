import { addMinutes, formatISO } from "date-fns";
import { Appointment, BookingRule, OpeningHour, Product, SalonInfo, Service, ServiceCategory, StaffMember, StaffWorkingWindow } from "./types";

export const salonInfo: SalonInfo = {
  name: "SCHNITTWERK by Vanessa Carosella",
  address: "Limmatstrasse 12, 8005 Zürich",
  phone: "+41 44 000 00 00",
  email: "hello@schnittwerk.ch",
  heroCopy: "Moderne Schnitte, gesunde Haare und ein herzliches Willkommen mitten in Zürich.",
};

export const openingHours: OpeningHour[] = [
  { day: "Dienstag", open: "09:00", close: "18:00" },
  { day: "Mittwoch", open: "09:00", close: "18:00" },
  { day: "Donnerstag", open: "09:00", close: "19:00" },
  { day: "Freitag", open: "09:00", close: "18:00" },
  { day: "Samstag", open: "09:00", close: "16:00" },
];

export const serviceCategories: ServiceCategory[] = [
  { id: "cut", name: "Schnitt", description: "Präzise Schnitte für Sie & Ihn" },
  { id: "color", name: "Farbe & Gloss", description: "Strahlende Nuancen mit gesunder Basis" },
  { id: "care", name: "Pflege", description: "Aufbauende Treatments" },
];

export const services: Service[] = [
  {
    id: "women-cut",
    category_id: "cut",
    name: "Haarschnitt Damen",
    description: "Beratung, Waschen, Schnitt & Styling",
    duration_minutes: 60,
    base_price_chf: 110,
  },
  {
    id: "men-cut",
    category_id: "cut",
    name: "Haarschnitt Herren",
    description: "Waschen, Schnitt & Finish",
    duration_minutes: 45,
    base_price_chf: 75,
  },
  {
    id: "balayage",
    category_id: "color",
    name: "Balayage & Gloss",
    description: "Natürliche Highlights inkl. Pflege",
    duration_minutes: 150,
    base_price_chf: 260,
  },
  {
    id: "olaplex",
    category_id: "care",
    name: "Olaplex Aufbau",
    description: "Stärkt geschädigte Haarstrukturen",
    duration_minutes: 30,
    base_price_chf: 45,
  },
];

export const staff: StaffMember[] = [
  {
    id: "vanessa",
    name: "Vanessa Carosella",
    bio: "Gründerin, spezialisiert auf Blondnuancen und präzise Schnitte.",
    skills: ["Balayage", "Schnitt Damen", "Glossing"],
  },
  {
    id: "lina",
    name: "Lina Meier",
    bio: "Detailverliebt und stark in Pflegeaufbauten und Herrenservice.",
    skills: ["Herren", "Pflege", "Schnitt"],
  },
];

export const staffWorkingHours: StaffWorkingWindow[] = [
  { staff_id: "vanessa", day: 1, start_minutes: 9 * 60, end_minutes: 18 * 60 },
  { staff_id: "vanessa", day: 3, start_minutes: 9 * 60, end_minutes: 19 * 60 },
  { staff_id: "lina", day: 2, start_minutes: 9 * 60, end_minutes: 18 * 60 },
  { staff_id: "lina", day: 4, start_minutes: 9 * 60, end_minutes: 16 * 60 },
];

export const bookingRules: BookingRule = {
  min_lead_time_minutes: 60,
  max_booking_horizon_days: 30,
  slot_granularity_minutes: 15,
  default_visit_buffer_minutes: 10,
  cancellation_cutoff_hours: 24,
};

export const sampleAppointments: Appointment[] = (() => {
  const now = new Date();
  const start = addMinutes(now, 180);
  return [
    {
      id: "appt-1",
      staff_id: "vanessa",
      start: formatISO(start),
      end: formatISO(addMinutes(start, 60)),
      status: "confirmed",
    },
  ];
})();

export const products: Product[] = [
  {
    id: "shampoo",
    name: "Feuchtigkeitsshampoo",
    description: "Sanfte Reinigung mit Hyaluron-Komplex.",
    price_chf: 32,
  },
  {
    id: "mask",
    name: "Repair Maske",
    description: "Regeneriert gestresstes Haar in 10 Minuten.",
    price_chf: 42,
  },
  {
    id: "oil",
    name: "Glanz Elixier",
    description: "Leichtes Öl für seidigen Schimmer.",
    price_chf: 38,
  },
];
