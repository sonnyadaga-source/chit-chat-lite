const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Absence = sequelize.define("Absence", {
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM("present", "absent"), allowNull: false },
  reported_by: { type: DataTypes.INTEGER, allowNull: false },
  notes: { type: DataTypes.TEXT },
  media_id: { type: DataTypes.INTEGER, allowNull: true },
  flagged: { type: DataTypes.BOOLEAN, defaultValue: false },
  flag_reason: { type: DataTypes.TEXT },
});

module.exports = Absence;
