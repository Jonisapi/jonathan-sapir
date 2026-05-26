create extension if not exists pgcrypto;

create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  winner text not null,
  total_goals integer not null check (total_goals >= 0),
  total_cards integer not null check (total_cards >= 0),
  submitted_at timestamptz not null default now()
);

create unique index if not exists predictions_email_unique
  on public.predictions (lower(email));

create unique index if not exists predictions_winner_unique
  on public.predictions (winner);

create table if not exists public.admin_state (
  id text primary key,
  locked boolean not null default false,
  actual_goals integer not null default 0 check (actual_goals >= 0),
  actual_cards integer not null default 0 check (actual_cards >= 0),
  teams jsonb not null,
  prizes jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.admin_state (id, locked, actual_goals, actual_cards, teams, prizes)
values (
  'admin',
  false,
  0,
  0,
  '[
    {"name":"Argentina","status":"active"},
    {"name":"Brazil","status":"active"},
    {"name":"France","status":"active"},
    {"name":"Germany","status":"active"},
    {"name":"Spain","status":"active"},
    {"name":"England","status":"active"},
    {"name":"Portugal","status":"active"},
    {"name":"Netherlands","status":"active"},
    {"name":"Belgium","status":"active"},
    {"name":"Croatia","status":"active"},
    {"name":"Italy","status":"active"},
    {"name":"Uruguay","status":"active"},
    {"name":"Colombia","status":"active"},
    {"name":"Mexico","status":"active"},
    {"name":"United States","status":"active"},
    {"name":"Canada","status":"active"},
    {"name":"Japan","status":"active"},
    {"name":"South Korea","status":"active"},
    {"name":"Australia","status":"active"},
    {"name":"Morocco","status":"active"},
    {"name":"Senegal","status":"active"},
    {"name":"Ghana","status":"active"},
    {"name":"Nigeria","status":"active"},
    {"name":"Cameroon","status":"active"},
    {"name":"Egypt","status":"active"},
    {"name":"South Africa","status":"active"},
    {"name":"Algeria","status":"active"},
    {"name":"Tunisia","status":"active"},
    {"name":"Switzerland","status":"active"},
    {"name":"Denmark","status":"active"},
    {"name":"Sweden","status":"active"},
    {"name":"Norway","status":"active"},
    {"name":"Poland","status":"active"},
    {"name":"Austria","status":"active"},
    {"name":"Serbia","status":"active"},
    {"name":"Czechia","status":"active"},
    {"name":"Scotland","status":"active"},
    {"name":"Wales","status":"active"},
    {"name":"Ireland","status":"active"},
    {"name":"Turkey","status":"active"},
    {"name":"Greece","status":"active"},
    {"name":"Ukraine","status":"active"},
    {"name":"Chile","status":"active"},
    {"name":"Peru","status":"active"},
    {"name":"Ecuador","status":"active"},
    {"name":"Paraguay","status":"active"},
    {"name":"Saudi Arabia","status":"active"},
    {"name":"Qatar","status":"active"}
  ]'::jsonb,
  '{"teamWinner":"Amazon voucher - 150 GBP","tickets":"Restaurant cost - 120 GBP","goals":"Restaurant cost - 120 GBP"}'::jsonb
)
on conflict (id) do nothing;
