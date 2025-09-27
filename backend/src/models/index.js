const { sequelize } = require("../config/db");

// Import models
const User = require("./User");
const Student = require("./Student");
const Section = require("./Section");
const Absence = require("./Absence");
const Media = require("./Media");
const AuditLog = require("./AuditLog");

// Define associations
// Sections <-> Students
Section.hasMany(Student, { foreignKey: "section_id", sourceKey: "id" });
Student.belongsTo(Section, { foreignKey: "section_id", targetKey: "id" });

// Sections <-> Users
Section.hasMany(User, { foreignKey: "section_id", sourceKey: "id" });
User.belongsTo(Section, { foreignKey: "section_id", targetKey: "id" });

// Students <-> Absences
Student.hasMany(Absence, { foreignKey: "student_id", sourceKey: "id" });
Absence.belongsTo(Student, { foreignKey: "student_id", targetKey: "id" });

// Media <-> Absences
Media.hasMany(Absence, { foreignKey: "media_id", sourceKey: "id" });
Absence.belongsTo(Media, { foreignKey: "media_id", targetKey: "id" });

// AuditLog -> User
User.hasMany(AuditLog, { foreignKey: "user_id", sourceKey: "id" });
AuditLog.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

module.exports = {
  sequelize,
  User,
  Student,
  Section,
  Absence,
  Media,
  AuditLog,
};
