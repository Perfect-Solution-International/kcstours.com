-- ====================================================================
-- KCSTours Sri Lanka - Seed Data
-- ====================================================================

USE kcstours_db;

-- 1. Default Admin User (username: admin, password: kcstours2026)
INSERT INTO admins (username, email, password_hash, role) 
VALUES ('admin', 'admin@kcstours.com', '$2a$10$Wp7sJkOq1V7rX2YgK8eZu.pW1eO8LqXk3v8Y7Z2ZgK8eZu.pW1eO8', 'Operations Officer')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- 2. Tour Packages
INSERT INTO tours (id, title, duration, price_usd, category, badge, featured) VALUES
('ceylon-odyssey', '10 Days Complete Ceylon Odyssey', '10 Days / 9 Nights', 1250.00, 'Comprehensive', 'Best Seller', TRUE),
('cultural-triangle', '5 Days Cultural & Heritage Wonder', '5 Days / 4 Nights', 580.00, 'Culture & History', 'Top Rated', TRUE),
('wildlife-safari', '7 Days Wild Ceylon & Leopard Safari', '7 Days / 6 Nights', 890.00, 'Wildlife & Nature', 'High Demand', TRUE),
('hill-country-retreat', '6 Days Tea Country & Misty Peaks', '6 Days / 5 Nights', 720.00, 'Scenic & Leisure', 'Popular', TRUE),
('coastal-getaway', '8 Days Tropical Sun, Surf & Whales', '8 Days / 7 Nights', 940.00, 'Beach & Ocean', 'Family Choice', TRUE),
('luxury-honeymoon', '12 Days Royal Honeymoon & Serenity', '12 Days / 11 Nights', 1890.00, 'Luxury & Romance', 'VIP Signature', TRUE)
ON DUPLICATE KEY UPDATE price_usd = VALUES(price_usd), featured = VALUES(featured);

-- 3. Chauffeur Fleet with Telemetry
INSERT INTO fleet (id, model, plate, type, capacity, chauffeur, driver_phone, license, status, current_location, fuel_level, speed, temp, eta, next_stop, rating, route_progress, active_guest, gps_coords, status_color) VALUES
('FL-01', 'Toyota Land Cruiser Prado 4x4', 'WP CAD-4920', 'Luxury 4x4 SUV', '4 Pax + Luggage', 'Nuwan Perera', '+94 77 441 2930', 'SLTDA Tourist Driver #TD-9921', 'On Tour', 'Sigiriya -> Kandy Expressway', '85%', '68 km/h', '21°C', '16:45 PM', 'Heritance Kandalama', '4.98 ★', 72, 'Sarah Jenkins (UK 🇬🇧)', '7.9570° N, 80.7603° E', '#10B981'),
('FL-02', 'Mercedes-Benz Sprinter Executive', 'WP NB-8821', 'VIP Mini-Coach', '8-12 Luxury Leather Seats', 'Chaminda Silva', '+94 71 882 1049', 'SLTDA Chauffeur Guide #CG-3120', 'Available at BIA Airport', 'Katunayake BIA Airport Lounge', '95%', '0 km/h (Standby)', '22°C', 'Awaiting Flight QR 664', 'BIA Silk Route Lounge', '5.0 ★', 100, 'VIP Arrival Group (Germany 🇩🇪)', '7.1808° N, 79.8841° E', '#00A3C4'),
('FL-03', 'Toyota KDH High-Roof Commuter', 'WP PE-6512', 'Spacious Family Van', '7-9 Passengers', 'Rohan Jayasinghe', '+94 76 339 5012', 'SLTDA Tourist Chauffeur #TD-4481', 'On Tour', 'Ella Highlands & Tea Trails', '70%', '45 km/h', '19°C', '17:15 PM', '98 Acres Resort & Spa', '4.95 ★', 84, 'Emily & Liam Evans (Australia 🇦🇺)', '6.8667° N, 81.0466° E', '#10B981'),
('FL-04', 'Toyota Camry Hybrid Luxury', 'WP CAA-1190', 'Executive Sedan', '3 Passengers', 'Dinesh Gamage', '+94 77 102 9934', 'SLTDA Tourist Chauffeur #TD-8829', 'Scheduled Maintenance', 'Colombo Central Workshop', '40%', '0 km/h (Depot)', 'Ambient', 'Ready Tomorrow 08:00 AM', 'Depot Fleet Inspection', '4.92 ★', 0, 'No Active Assignment', '6.9271° N, 79.8612° E', '#EF4444')
ON DUPLICATE KEY UPDATE status = VALUES(status), speed = VALUES(speed), fuel_level = VALUES(fuel_level);

-- 4. Bookings & Reservations
INSERT INTO bookings (id, guest, email, phone, country, tour_id, tour_title, dates, pax, amount, status, assigned_driver, special_requests, paid_amount, created_at) VALUES
('KCS-2026-9281', 'Sarah Jenkins', 'sarah.j@outlook.co.uk', '+44 7911 123456', 'United Kingdom 🇬🇧', 'ceylon-odyssey', '10 Days Complete Ceylon Odyssey', '12 Oct - 22 Oct 2026', '2 Adults', 2780.00, 'Confirmed', 'Nuwan Perera (Toyota Prado)', 'Honeymoon setup at Ella 98 Acres, vegetarian meal options requested.', 2780.00, '2026-09-28'),
('KCS-2026-8842', 'Dr. Klaus Brandt', 'klaus.brandt@med-berlin.de', '+49 170 9876543', 'Germany 🇩🇪', 'cultural-triangle', '7 Days Sri Lanka Classic Highlights', '05 Nov - 12 Nov 2026', '3 Adults', 2670.00, 'Deposit Paid', 'Chaminda Silva (Mercedes Sprinter)', 'German speaking licensed national guide requested for Sigiriya & Polonnaruwa.', 800.00, '2026-09-27'),
('KCS-2026-7319', 'Emily & Liam Evans', 'emily.evans@sydney.com.au', '+61 400 555 123', 'Australia 🇦🇺', 'wildlife-safari', '12 Days Grand Luxury Safari & Tea Trails', '20 Nov - 02 Dec 2026', '2 Adults', 4900.00, 'Confirmed', 'Rohan Jayasinghe (Toyota Land Cruiser)', 'Private leopard safari jeep in Yala Block 1 with senior wildlife tracker.', 4900.00, '2026-09-25'),
('KCS-2026-6104', 'Marc Dupont', 'm.dupont@orange.fr', '+33 6 12 34 56 78', 'France 🇫🇷', 'wildlife-safari', 'Custom Family Wildlife & Beach Tour', '15 Dec - 24 Dec 2026', '2 Adults, 2 Kids', 3850.00, 'Quoted', 'Pending Chauffeur Assignment', 'Need 1 infant car seat and interconnecting rooms in Bentota resort.', 0.00, '2026-09-26'),
('KCS-2026-5520', 'Rachel Moore', 'rachel.m@california.com', '+1 415 555 8920', 'United States 🇺🇸', 'cultural-triangle', '5 Days Cultural & Hill Country Wonders', '02 Jan - 07 Jan 2027', '2 Adults', 1240.00, 'New Inquiry', 'Pending Chauffeur Assignment', 'Interested in scenic first class observation train tickets from Kandy to Ella.', 0.00, '2026-09-29')
ON DUPLICATE KEY UPDATE status = VALUES(status), amount = VALUES(amount);

-- 5. Customer Inquiries
INSERT INTO inquiries (id, sender, email, phone, subject, message, is_read, created_at) VALUES
('MSG-301', 'Charlotte Davies', 'c.davies@londonlaw.co.uk', '+44 7700 900077', 'Custom 14 Days Honeymoon Itinerary with Tea Trails & Maldives Extension', 'Hello KCSTours team, we are planning our honeymoon for November 2026. We would love private chauffeur travel, scenic train tickets to Ella, and 3 nights in a private pool villa. Could you share a customized proposal?', FALSE, 'Today, 02:40 PM'),
('MSG-302', 'Lars & Greta Lindqvist', 'lars.lindqvist@stockholm.se', '+46 8 123 456', 'Wildlife Photography Tour for Yala & Wilpattu', 'Hi, we are two wildlife photographers seeking dedicated full-day jeep safaris in Yala Block 1 & 5. We need beanbags, charging in vehicle, and an experienced wildlife naturalist guide.', TRUE, 'Yesterday, 07:15 PM'),
('MSG-303', 'Oliver Smith', 'oliver.smith@melbourne.edu.au', '+61 3 9000 1122', 'Airport Transfer to Galle Fort with Surfboard Luggage', 'Looking for a private luxury van from Colombo BIA Airport direct to Galle Fort on 14th October at 09:30 AM. We have 2 big suitcases and 2 surfboards.', TRUE, '28 Sep 2026')
ON DUPLICATE KEY UPDATE is_read = VALUES(is_read);
