-- Phase 1: Kernschema für SCHNITTWERK
create table if not exists salons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  phone text not null,
  email text not null,
  hero_copy text default ''
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists roles (
  id text primary key,
  description text
);

create table if not exists user_roles (
  user_id uuid references profiles(id) on delete cascade,
  role_id text references roles(id) on delete cascade,
  primary key (user_id, role_id)
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  salon_id uuid references salons(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  name text not null,
  bio text,
  skills text[] default '{}'
);

create table if not exists service_categories (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  name text not null,
  description text
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  category_id uuid references service_categories(id) on delete cascade,
  name text not null,
  description text,
  duration_minutes int not null,
  base_price_chf numeric(10,2) not null
);

create table if not exists service_prices (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  valid_from date not null,
  price_chf numeric(10,2) not null,
  snapshot boolean default false
);

create table if not exists opening_hours (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  day int not null,
  open text not null,
  close text not null
);

create table if not exists staff_working_hours (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid references staff(id) on delete cascade,
  day int not null,
  start_minutes int not null,
  end_minutes int not null
);

create table if not exists booking_rules (
  salon_id uuid primary key references salons(id) on delete cascade,
  min_lead_time_minutes int not null,
  max_booking_horizon_days int not null,
  slot_granularity_minutes int not null,
  default_visit_buffer_minutes int not null,
  cancellation_cutoff_hours int not null
);

create type appointment_status as enum ('reserved','confirmed','cancelled');

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  staff_id uuid references staff(id) on delete set null,
  customer_email text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status appointment_status default 'reserved',
  created_at timestamptz default now()
);

alter table salons enable row level security;
alter table profiles enable row level security;
alter table customers enable row level security;
alter table staff enable row level security;
alter table service_categories enable row level security;
alter table services enable row level security;
alter table opening_hours enable row level security;
alter table staff_working_hours enable row level security;
alter table booking_rules enable row level security;
alter table appointments enable row level security;

-- Basic RLS: authenticated users see their salon; anon read public marketing tables
create policy "public marketing read" on salons for select using (true);
create policy "public marketing hours" on opening_hours for select using (true);
create policy "public marketing services" on service_categories for select using (true);
create policy "public marketing services list" on services for select using (true);

create policy "profiles are self" on profiles for select using (auth.uid() = id);
create policy "customers own data" on customers for select using (profile_id = auth.uid());

create policy "appointments by salon" on appointments for select using (
  exists (select 1 from staff s where s.id = appointments.staff_id)
);

-- Seeds
insert into roles (id, description) values ('admin', 'Salon Admin'), ('staff', 'Mitarbeiter'), ('customer', 'Kunde') on conflict do nothing;

insert into salons (id, name, address, phone, email, hero_copy)
values (
  '00000000-0000-0000-0000-000000000001',
  'SCHNITTWERK by Vanessa Carosella',
  'Limmatstrasse 12, 8005 Zürich',
  '+41 44 000 00 00',
  'hello@schnittwerk.ch',
  'Moderne Schnitte, gesunde Farbe, herzlicher Service.'
) on conflict (id) do nothing;

insert into service_categories (id, salon_id, name, description) values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Schnitt', 'Präzise Schnitte'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'Farbe & Gloss', 'Strahlende Nuancen'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'Pflege', 'Aufbauende Treatments')
  on conflict (id) do nothing;

insert into services (id, salon_id, category_id, name, description, duration_minutes, base_price_chf) values
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Haarschnitt Damen', 'Beratung, Waschen, Schnitt & Styling', 60, 110),
  ('55555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Haarschnitt Herren', 'Waschen, Schnitt & Finish', 45, 75),
  ('66666666-6666-6666-6666-666666666666', '00000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'Balayage & Gloss', 'Natürliche Highlights inkl. Pflege', 150, 260)
  on conflict (id) do nothing;

insert into staff (id, salon_id, name, bio, skills) values
  ('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000001', 'Vanessa Carosella', 'Blond-Spezialistin und Gründerin', '{Balayage,Schnitt Damen}'),
  ('88888888-8888-8888-8888-888888888888', '00000000-0000-0000-0000-000000000001', 'Lina Meier', 'Pflege & Herrenservice', '{Pflege,Herren}')
  on conflict (id) do nothing;

insert into staff_working_hours (staff_id, day, start_minutes, end_minutes) values
  ('77777777-7777-7777-7777-777777777777', 1, 540, 1080),
  ('77777777-7777-7777-7777-777777777777', 3, 540, 1140),
  ('88888888-8888-8888-8888-888888888888', 2, 540, 1080),
  ('88888888-8888-8888-8888-888888888888', 4, 540, 960)
  on conflict do nothing;

insert into booking_rules (salon_id, min_lead_time_minutes, max_booking_horizon_days, slot_granularity_minutes, default_visit_buffer_minutes, cancellation_cutoff_hours)
values ('00000000-0000-0000-0000-000000000001', 60, 30, 15, 10, 24)
on conflict (salon_id) do update set
  min_lead_time_minutes = excluded.min_lead_time_minutes,
  max_booking_horizon_days = excluded.max_booking_horizon_days,
  slot_granularity_minutes = excluded.slot_granularity_minutes,
  default_visit_buffer_minutes = excluded.default_visit_buffer_minutes,
  cancellation_cutoff_hours = excluded.cancellation_cutoff_hours;
