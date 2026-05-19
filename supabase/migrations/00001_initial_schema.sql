-- Clubs (must come before profiles due to FK reference)
create table clubs (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  sport text not null,
  location text not null,
  province text not null,
  description text,
  logo_url text,
  website_url text,
  member_count integer default 0,
  courts_count integer default 0,
  rating numeric(3,2) default 0,
  is_verified boolean default false,
  is_safe_trade_location boolean default false,
  booking_url text,
  created_at timestamptz default now()
);

-- Profiles
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  location text,
  bio text,
  sports text[] default '{}',
  skill_levels jsonb default '{}',
  trust_tier text default 'community',
  trade_count integer default 0,
  rep_score numeric(3,2) default 0,
  is_verified boolean default false,
  club_id uuid references clubs(id),
  last_visited_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, display_name, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    lower(regexp_replace(
      coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
      '[^a-z0-9]', '_', 'g'
    )) || '_' || substr(new.id::text, 1, 4)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Threads
create table threads (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references profiles(id) on delete cascade not null,
  sport text not null,
  prefix text not null,
  title text not null,
  body text not null,
  region text,
  club_id uuid references clubs(id),
  is_wtb boolean default false,
  reply_count integer default 0,
  like_count integer default 0,
  is_pinned boolean default false,
  is_locked boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index threads_sport_idx on threads(sport);
create index threads_created_at_idx on threads(created_at desc);
create index threads_author_idx on threads(author_id);

-- Replies
create table replies (
  id uuid default gen_random_uuid() primary key,
  thread_id uuid references threads(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  body text not null,
  like_count integer default 0,
  created_at timestamptz default now()
);

create index replies_thread_idx on replies(thread_id);

-- Thread interactions
create table thread_likes (
  user_id uuid references profiles(id) on delete cascade,
  thread_id uuid references threads(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, thread_id)
);

create table thread_saves (
  user_id uuid references profiles(id) on delete cascade,
  thread_id uuid references threads(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, thread_id)
);

-- Listings (marketplace)
create table listings (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references profiles(id) on delete cascade not null,
  sport text not null,
  prefix text not null,
  category text,
  brand text,
  province text,
  tags text[] default '{}',
  sub_category text,
  title text not null,
  description text not null,
  price integer,
  condition text,
  location text not null,
  is_bundle boolean default false,
  item_count integer default 1,
  is_sold boolean default false,
  is_active boolean default true,
  save_count integer default 0,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index listings_sport_idx on listings(sport);
create index listings_category_idx on listings(sport, category);
create index listings_province_idx on listings(province);
create index listings_active_idx on listings(is_active, is_sold);
create index listings_seller_idx on listings(seller_id);

-- Listing images
create table listing_images (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references listings(id) on delete cascade not null,
  storage_path text not null,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Listing saves
create table listing_saves (
  user_id uuid references profiles(id) on delete cascade,
  listing_id uuid references listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, listing_id)
);

-- Direct messages
create table messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references profiles(id) on delete cascade not null,
  recipient_id uuid references profiles(id) on delete cascade not null,
  listing_id uuid references listings(id),
  body text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

create index messages_recipient_idx on messages(recipient_id, is_read);
create index messages_sender_idx on messages(sender_id);

-- Live chat
create table chat_messages (
  id uuid default gen_random_uuid() primary key,
  channel text not null,
  author_id uuid references profiles(id) on delete cascade not null,
  body text not null,
  created_at timestamptz default now()
);

create index chat_messages_channel_idx on chat_messages(channel, created_at desc);

-- Trades
create table trades (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references listings(id) not null,
  seller_id uuid references profiles(id) not null,
  buyer_id uuid references profiles(id) not null,
  agreed_price integer,
  seller_rating integer,
  buyer_rating integer,
  seller_review text,
  buyer_review text,
  completed_at timestamptz default now()
);

-- Notifications
create table notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  body text,
  link text,
  is_read boolean default false,
  created_at timestamptz default now()
);

create index notifications_user_idx on notifications(user_id, is_read);
