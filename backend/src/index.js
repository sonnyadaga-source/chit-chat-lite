require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models/index");

const studentRoutes = require("./routes/studentRoutes");
const sectionRoutes = require("./routes/SectionRoutes");
const userRoutes = require("./routes/UserRoutes");
const absenceRoutes = require("./routes/AbsenceRoutes");
const mediaRoutes = require("./routes/MediaRoutes");
const auditLogRoutes = require("./routes/AuditLogRoutes");

const authenticate = require("./middleware/auth");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'http://localhost:3000'
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health endpoint for docker healthchecks
app.get("/", (req, res) => {
  res.status(200).send("ok");
});

// Public routes
app.use("/users", userRoutes); // includes /login

// Protected routes (require JWT)
app.use("/students", authenticate, studentRoutes);
app.use("/sections", authenticate, sectionRoutes);
app.use("/absences", authenticate, absenceRoutes);
app.use("/media", authenticate, mediaRoutes);
app.use("/audit-logs", authenticate, auditLogRoutes);

// DB sync & server start
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync(); // optional: { alter: true } in dev

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
  }
})();
