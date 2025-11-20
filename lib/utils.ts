import { type ClassValue, twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSwissTime(date: Date) {
  return date.toLocaleString("de-CH", { timeZone: "Europe/Zurich" });
}

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
