const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Student = sequelize.define("Student", {
  name: { type: DataTypes.STRING, allowNull: false },
  section_id: { type: DataTypes.INTEGER, allowNull: false },
  contact_number: { type: DataTypes.STRING },
});

module.exports = Student;
