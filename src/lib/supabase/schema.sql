-- TurboPlus Database Schema for Supabase
-- Bu faylı Supabase SQL Editor-də işə salacaqsan

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  is_dealer boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Listings table
create table if not exists public.listings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  brand text not null,
  model text not null,
  year integer not null,
  price integer not null,
  currency text default 'AZN',
  mileage integer not null,
  fuel_type text not null,
  transmission text not null,
  body_type text,
  color text,
  engine_volume numeric(3,1),
  horse_power integer,
  city text not null,
  location text,
  description text,
  images text[] default '{}',
  features text[] default '{}',
  is_premium boolean default false,
  is_new boolean default false,
  seller_type text default 'Şəxsi',
  status text default 'active' check (status in ('active', 'sold', 'pending', 'rejected')),
  views integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Favorites
create table if not exists public.favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  listing_id uuid references public.listings(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, listing_id)
);

-- Indexes for better performance
create index if not exists listings_brand_idx on public.listings(brand);
create index if not exists listings_city_idx on public.listings(city);
create index if not exists listings_price_idx on public.listings(price);
create index if not exists listings_year_idx on public.listings(year);
create index if not exists listings_status_idx on public.listings(status);
create index if not exists listings_created_at_idx on public.listings(created_at desc);
create index if not exists listings_is_premium_idx on public.listings(is_premium);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.favorites enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Listings policies
create policy "Active listings are viewable by everyone"
  on public.listings for select using (status = 'active' or auth.uid() = user_id);

create policy "Users can insert own listings"
  on public.listings for insert with check (auth.uid() = user_id);

create policy "Users can update own listings"
  on public.listings for update using (auth.uid() = user_id);

create policy "Users can delete own listings"
  on public.listings for delete using (auth.uid() = user_id);

-- Favorites policies
create policy "Users can view own favorites"
  on public.favorites for select using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on public.favorites for insert with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete using (auth.uid() = user_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
