-- =============================
-- POD AI Monitoring Assistant
-- Database Initialization Script
-- =============================

-- Drop existing tables if they exist (safety for re-run in dev)
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS absences CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS sections CASCADE;

-- -----------------------------
-- Sections Table
-- -----------------------------
CREATE TABLE sections (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	adviser_name VARCHAR(150) NOT NULL
);

-- -----------------------------
-- Students Table
-- -----------------------------
CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	section_id INT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
	contact_number VARCHAR(20)
);

-- -----------------------------
-- Users Table
-- -----------------------------
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	password_hash TEXT NOT NULL,
	role VARCHAR(20) NOT NULL CHECK (role IN ('beadle','adviser','coordinator')),
	section_id INT REFERENCES sections(id) ON DELETE SET NULL
);

-- -----------------------------
-- Media Table
-- -----------------------------
CREATE TABLE media (
	id SERIAL PRIMARY KEY,
	url TEXT NOT NULL,
	type VARCHAR(20) NOT NULL CHECK (type IN ('image','video')),
	size INT NOT NULL,
	checksum VARCHAR(128) NOT NULL
);

-- -----------------------------
-- Absences Table
-- -----------------------------
CREATE TABLE absences (
	id SERIAL PRIMARY KEY,
	student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
	date DATE NOT NULL,
	status VARCHAR(10) NOT NULL CHECK (status IN ('present','absent')),
	reported_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	notes TEXT,
	media_id INT REFERENCES media(id) ON DELETE SET NULL,
	flagged BOOLEAN DEFAULT FALSE,
	flag_reason TEXT
);

-- -----------------------------
-- Audit Log Table
-- -----------------------------
CREATE TABLE audit_log (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	action VARCHAR(50) NOT NULL,
	before_values JSONB,
	after_values JSONB,
	reason TEXT,
	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- Indexes for performance
-- =============================
CREATE INDEX idx_students_section ON students(section_id);
CREATE INDEX idx_absences_student ON absences(student_id);
CREATE INDEX idx_absences_date ON absences(date);
CREATE INDEX idx_absences_reported_by ON absences(reported_by);
CREATE INDEX idx_audit_user ON audit_log(user_id);

