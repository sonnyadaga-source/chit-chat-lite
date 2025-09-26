const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.TEXT, allowNull: false },
  role: { 
    type: DataTypes.ENUM("beadle", "adviser", "coordinator"), 
    allowNull: false 
  },
  section_id: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = User;
