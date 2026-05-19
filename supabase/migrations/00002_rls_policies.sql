-- Row Level Security policies

alter table profiles enable row level security;
create policy "Public profiles" on profiles for select using (true);
create policy "Own profile update" on profiles for update using (auth.uid() = id);

alter table threads enable row level security;
create policy "Public threads" on threads for select using (true);
create policy "Auth insert threads" on threads for insert with check (auth.uid() = author_id);
create policy "Author update threads" on threads for update using (auth.uid() = author_id);
create policy "Author delete threads" on threads for delete using (auth.uid() = author_id);

alter table replies enable row level security;
create policy "Public replies" on replies for select using (true);
create policy "Auth insert replies" on replies for insert with check (auth.uid() = author_id);
create policy "Author delete replies" on replies for delete using (auth.uid() = author_id);

alter table thread_likes enable row level security;
create policy "Public thread likes" on thread_likes for select using (true);
create policy "Auth insert thread likes" on thread_likes for insert with check (auth.uid() = user_id);
create policy "Own delete thread likes" on thread_likes for delete using (auth.uid() = user_id);

alter table thread_saves enable row level security;
create policy "Own thread saves" on thread_saves for select using (auth.uid() = user_id);
create policy "Auth insert thread saves" on thread_saves for insert with check (auth.uid() = user_id);
create policy "Own delete thread saves" on thread_saves for delete using (auth.uid() = user_id);

alter table listings enable row level security;
create policy "Public listings" on listings for select using (true);
create policy "Auth insert listings" on listings for insert with check (auth.uid() = seller_id);
create policy "Seller update listings" on listings for update using (auth.uid() = seller_id);
create policy "Seller delete listings" on listings for delete using (auth.uid() = seller_id);

alter table listing_images enable row level security;
create policy "Public listing images" on listing_images for select using (true);
create policy "Auth insert listing images" on listing_images for insert with check (true);

alter table listing_saves enable row level security;
create policy "Own listing saves" on listing_saves for select using (auth.uid() = user_id);
create policy "Auth insert listing saves" on listing_saves for insert with check (auth.uid() = user_id);
create policy "Own delete listing saves" on listing_saves for delete using (auth.uid() = user_id);

alter table messages enable row level security;
create policy "Message parties" on messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);
create policy "Send message" on messages for insert with check (auth.uid() = sender_id);

alter table chat_messages enable row level security;
create policy "Read chat" on chat_messages for select using (auth.role() = 'authenticated');
create policy "Send chat" on chat_messages for insert with check (auth.uid() = author_id);

alter table clubs enable row level security;
create policy "Public clubs" on clubs for select using (true);

alter table trades enable row level security;
create policy "Trade parties" on trades for select
  using (auth.uid() = seller_id or auth.uid() = buyer_id);

alter table notifications enable row level security;
create policy "Own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Mark read notifications" on notifications for update using (auth.uid() = user_id);
