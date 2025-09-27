# Metabase Sample Queries

1. Top Absent Students (Last 30 Days)
```
SELECT s.name AS student, sec.name AS section, COUNT(a.id) AS absence_count
FROM absences a
JOIN students s ON a.student_id = s.id
JOIN sections sec ON s.section_id = sec.id
WHERE a.status = 'absent' AND a.date >= NOW() - INTERVAL '30 days'
GROUP BY s.name, sec.name
ORDER BY absence_count DESC
LIMIT 10;
```

2. Section with Most Absences (This Month)
```
SELECT sec.name AS section, COUNT(a.id) AS total_absences
FROM absences a
JOIN students s ON a.student_id = s.id
JOIN sections sec ON s.section_id = sec.id
WHERE a.status = 'absent' AND DATE_TRUNC('month', a.date) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY sec.name
ORDER BY total_absences DESC
LIMIT 1;
```

3. Students Flagged (Escalation Cases)
```
SELECT s.name, sec.name AS section, a.flag_reason, COUNT(a.id) AS total_absences
FROM absences a
JOIN students s ON a.student_id = s.id
JOIN sections sec ON s.section_id = sec.id
WHERE a.flagged = TRUE
GROUP BY s.name, sec.name, a.flag_reason;
```

4. Weekly Compliance Check
```
SELECT sec.name
FROM sections sec
WHERE NOT EXISTS (
    SELECT 1 FROM absences a
    JOIN students s ON a.student_id = s.id
    WHERE s.section_id = sec.id AND a.date >= NOW() - INTERVAL '7 days'
);
```

5. Coordinator Export (Full Report)
```
SELECT s.name AS student, sec.name AS section, a.date, a.status, a.notes, u.username AS reported_by
FROM absences a
JOIN students s ON a.student_id = s.id
JOIN sections sec ON s.section_id = sec.id
JOIN users u ON a.reported_by = u.id
ORDER BY a.date DESC;
```
