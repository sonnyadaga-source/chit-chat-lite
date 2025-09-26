const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Media = sequelize.define("Media", {
  url: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.ENUM("image", "video"), allowNull: false },
  size: { type: DataTypes.INTEGER, allowNull: false },
  checksum: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Media;
