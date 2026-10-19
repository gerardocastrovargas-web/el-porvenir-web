-- Run manually in Supabase SQL editor. Only server-side service role may insert/read.
create table if not exists public.investor_inquiries (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null, email text not null, organization text,
 message text, source text not null default 'el-porvenir-website'
);
alter table public.investor_inquiries enable row level security;
-- No public/anon policies. Server-side service-role bypasses RLS.
