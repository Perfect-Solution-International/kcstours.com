-- ====================================================================
-- KCSTours Sri Lanka - MySQL Production Database Schema
-- Compatible with MySQL 8.x / 9.x / MariaDB
-- ====================================================================

CREATE DATABASE IF NOT EXISTS kcstours_db 
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE kcstours_db;

-- 1. Admins & Staff Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Operations Officer',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tour Packages Catalog Table
CREATE TABLE IF NOT EXISTS tours (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    price_usd DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    badge VARCHAR(100) DEFAULT '',
    featured BOOLEAN DEFAULT TRUE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Bookings & Reservations Table
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    guest VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    tour_id VARCHAR(100),
    tour_title VARCHAR(255) NOT NULL,
    dates VARCHAR(100) NOT NULL,
    pax VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    status ENUM('New Inquiry', 'Quoted', 'Deposit Paid', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'New Inquiry',
    assigned_driver VARCHAR(150) DEFAULT 'Pending Chauffeur Assignment',
    special_requests TEXT,
    paid_amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at DATE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Fleet & Chauffeur Telemetry Table
CREATE TABLE IF NOT EXISTS fleet (
    id VARCHAR(50) PRIMARY KEY,
    model VARCHAR(150) NOT NULL,
    plate VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(100) NOT NULL,
    capacity VARCHAR(100) NOT NULL,
    chauffeur VARCHAR(150) NOT NULL,
    driver_phone VARCHAR(50) NOT NULL,
    license VARCHAR(100) NOT NULL,
    status ENUM('On Tour', 'Available at BIA Airport', 'Scheduled Maintenance', 'Standby') DEFAULT 'Available at BIA Airport',
    current_location VARCHAR(255) NOT NULL,
    fuel_level VARCHAR(20) DEFAULT '85%',
    speed VARCHAR(50) DEFAULT '0 km/h',
    temp VARCHAR(50) DEFAULT '21°C',
    eta VARCHAR(100) DEFAULT 'Normal Transit',
    next_stop VARCHAR(255) DEFAULT 'BIA Airport Base',
    rating VARCHAR(20) DEFAULT '5.0 ★',
    route_progress INT DEFAULT 0,
    active_guest VARCHAR(255) DEFAULT 'Standby',
    gps_coords VARCHAR(100) DEFAULT '7.1808° N, 79.8841° E',
    status_color VARCHAR(20) DEFAULT '#10B981',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Customer Inquiries & Concierge Inbox Table
CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR(50) PRIMARY KEY,
    sender VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    reply_notes TEXT,
    created_at VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Indexing for high-performance dashboard queries
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at);
CREATE INDEX idx_fleet_status ON fleet(status);
CREATE INDEX idx_inquiries_read ON inquiries(is_read);
