export type OpeningHour = {
  day: string;
  open: string;
  close: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  description?: string;
};

export type Service = {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  duration_minutes: number;
  base_price_chf: number;
};

export type StaffMember = {
  id: string;
  name: string;
  bio: string;
  skills: string[];
};

export type SalonInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
  heroCopy: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price_chf: number;
  image?: string;
};

export type BookingRule = {
  min_lead_time_minutes: number;
  max_booking_horizon_days: number;
  slot_granularity_minutes: number;
  default_visit_buffer_minutes: number;
  cancellation_cutoff_hours: number;
};

export type StaffWorkingWindow = {
  staff_id: string;
  day: number; // 0-6
  start_minutes: number;
  end_minutes: number;
};

export type Appointment = {
  id: string;
  staff_id: string;
  start: string;
  end: string;
  status: "reserved" | "confirmed" | "cancelled";
};
