-- Seed data for PlayedIn development
-- Run after migrations and after creating test users in Supabase Auth

-- Clubs
INSERT INTO clubs (name, sport, location, province, member_count, courts_count, rating, is_verified, is_safe_trade_location, booking_url) VALUES
('Westville Padel Lab', 'padel', 'Westville, KZN', 'KwaZulu-Natal', 842, 6, 4.80, true, true, 'https://westvillepadellab.co.za/book'),
('Umhlanga Racket Club', 'padel', 'Umhlanga, KZN', 'KwaZulu-Natal', 1240, 8, 4.90, true, true, 'https://umhlangaracketclub.co.za/book'),
('Selborne Golf Estate', 'golf', 'Pennington, KZN', 'KwaZulu-Natal', 680, 18, 4.70, true, false, 'https://selborne.co.za/book'),
('San Lameer Country Club', 'golf', 'San Lameer, KZN', 'KwaZulu-Natal', 520, 18, 4.80, true, false, NULL),
('Royal Joburg & Kensington', 'golf', 'Linksfield, GP', 'Gauteng', 1100, 36, 4.90, true, false, NULL),
('Giba Gorge MTB Park', 'cycling', 'Pinetown, KZN', 'KwaZulu-Natal', 980, 42, 4.70, true, true, NULL),
('Holla Trails', 'cycling', 'Karkloof, KZN', 'KwaZulu-Natal', 540, 28, 4.80, false, false, NULL),
('Virginia Sports Club', 'padel', 'Durban North, KZN', 'KwaZulu-Natal', 610, 4, 4.50, false, false, NULL);
