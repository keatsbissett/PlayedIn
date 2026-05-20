CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, username)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    lower(replace(
      coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
      ' ', '_'
    )) || '_' || substr(new.id::text, 1, 4)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
