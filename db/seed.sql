-- =============================
-- POD AI Monitoring Assistant
-- Seed Data Script
-- =============================

-- Insert Sections
INSERT INTO sections (name, adviser_name) VALUES
('Section LOVE', 'Mr. Santos'),
('Section HOPE', 'Ms. Cruz'),
('Section FAITH', 'Mrs. Reyes');

-- Insert Students (5 per section)
INSERT INTO students (name, section_id, contact_number) VALUES
('Alice Dela Cruz', 1, '09170000001'),
('Benjie Ramos', 1, '09170000002'),
('Cathy Lim', 1, '09170000003'),
('David Chua', 1, '09170000004'),
('Ella Manalo', 1, '09170000005'),

('Francis Ong', 2, '09170000006'),
('Grace Navarro', 2, '09170000007'),
('Henry Lee', 2, '09170000008'),
('Ivy Bautista', 2, '09170000009'),
('Jake Villanueva', 2, '09170000010'),

('Karen Yu', 3, '09170000011'),
('Lance Gutierrez', 3, '09170000012'),
('Monica Flores', 3, '09170000013'),
('Nathan Santos', 3, '09170000014'),
('Olivia Mercado', 3, '09170000015');

-- Insert Users (1 coordinator, 1 adviser per section, 1 beadle per section)
INSERT INTO users (username, password_hash, role, section_id) VALUES
('coord1', 'hashed_password_here', 'coordinator', NULL),
('adv_love', 'hashed_password_here', 'adviser', 1),
('adv_hope', 'hashed_password_here', 'adviser', 2),
('adv_faith', 'hashed_password_here', 'adviser', 3),
('beadle_love', 'hashed_password_here', 'beadle', 1),
('beadle_hope', 'hashed_password_here', 'beadle', 2),
('beadle_faith', 'hashed_password_here', 'beadle', 3);

-- Insert Sample Media
INSERT INTO media (url, type, size, checksum) VALUES
('https://minio.local/media/proof1.jpg', 'image', 120000, 'checksum1'),
('https://minio.local/media/proof2.jpg', 'image', 140000, 'checksum2');

-- Insert Absences (Sample Logs)
INSERT INTO absences (student_id, date, status, reported_by, notes, media_id, flagged, flag_reason) VALUES
(1, '2025-09-24', 'absent', 5, 'No excuse submitted', 1, TRUE, '3 consecutive absences'),
(2, '2025-09-24', 'present', 5, NULL, NULL, FALSE, NULL),
(6, '2025-09-24', 'absent', 6, 'Medical leave filed', 2, FALSE, NULL);

