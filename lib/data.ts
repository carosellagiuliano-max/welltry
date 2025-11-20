import { isSupabaseConfigured } from "./utils";
import { getServerSupabase } from "./supabaseClient";
import {
  Appointment,
  BookingRule,
  OpeningHour,
  Product,
  SalonInfo,
  Service,
  ServiceCategory,
  StaffMember,
  StaffWorkingWindow,
} from "./types";
import {
  bookingRules,
  openingHours,
  products,
  salonInfo,
  sampleAppointments,
  serviceCategories,
  services,
  staff,
  staffWorkingHours,
} from "./mock-data";

export async function getSalonInfo(): Promise<SalonInfo> {
  if (!isSupabaseConfigured()) return salonInfo;
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from("salons").select("name,address,phone,email,heroCopy:hero_copy").single();
  if (error || !data) return salonInfo;
  return { name: data.name, address: data.address, phone: data.phone, email: data.email, heroCopy: data.heroCopy };
}

export async function getOpeningHours(): Promise<OpeningHour[]> {
  if (!isSupabaseConfigured()) return openingHours;
  const supabase = getServerSupabase();
  const { data } = await supabase.from("opening_hours").select("day, open, close").order("day");
  return data ?? openingHours;
}

export async function getServiceCatalog(): Promise<{ categories: ServiceCategory[]; services: Service[] }> {
  if (!isSupabaseConfigured()) return { categories: serviceCategories, services };
  const supabase = getServerSupabase();
  const { data: categories } = await supabase.from("service_categories").select("id,name,description");
  const { data: serviceRows } = await supabase
    .from("services")
    .select("id,category_id,name,description,base_price_chf,duration_minutes");
  return { categories: categories ?? serviceCategories, services: serviceRows ?? services };
}

export async function getStaff(): Promise<StaffMember[]> {
  if (!isSupabaseConfigured()) return staff;
  const supabase = getServerSupabase();
  const { data } = await supabase.from("staff").select("id,name,bio,skills");
  return data ?? staff;
}

export async function getStaffWorkingHours(): Promise<StaffWorkingWindow[]> {
  if (!isSupabaseConfigured()) return staffWorkingHours;
  const supabase = getServerSupabase();
  const { data } = await supabase.from("staff_working_hours").select("staff_id,day,start_minutes,end_minutes");
  return data ?? staffWorkingHours;
}

export async function getBookingRules(): Promise<BookingRule> {
  if (!isSupabaseConfigured()) return bookingRules;
  const supabase = getServerSupabase();
  const { data } = await supabase.from("booking_rules").select("min_lead_time_minutes,max_booking_horizon_days,slot_granularity_minutes,default_visit_buffer_minutes,cancellation_cutoff_hours").single();
  return (data as BookingRule) ?? bookingRules;
}

export async function getAppointments(): Promise<Appointment[]> {
  if (!isSupabaseConfigured()) return sampleAppointments;
  const supabase = getServerSupabase();
  const { data } = await supabase
    .from("appointments")
    .select("id,staff_id,start_time:start,end_time:end,status")
    .eq("status", "confirmed");
  return data ?? sampleAppointments;
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return products;
  const supabase = getServerSupabase();
  const { data } = await supabase.from("products").select("id,name,description,price_chf,image");
  return data ?? products;
}
