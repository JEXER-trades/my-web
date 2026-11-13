-- Project inquiries submitted through the website contact form.
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 120),
  email       text not null check (char_length(email) between 5 and 200),
  company     text check (char_length(company) <= 160),
  service     text not null check (char_length(service) <= 120),
  message     text not null check (char_length(message) between 20 and 5000),
  budget      text check (char_length(budget) <= 60),
  ip_hash     text,
  user_agent  text,
  email_sent  boolean not null default false
);

create index if not exists inquiries_ip_hash_created_idx on public.inquiries (ip_hash, created_at desc);

-- Row Level Security on, with NO public policies: the anon key cannot read
-- or write this table. Only the Edge Function (service role) can insert.
alter table public.inquiries enable row level security;
