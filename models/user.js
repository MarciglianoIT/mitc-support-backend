"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const UserData = require("./userdata");

const User = sequelize.define("User", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  email: DataTypes.STRING,
  provider: DataTypes.STRING,
});

User.hasOne(UserData, { foreignKey: "id" });
UserData.hasOne(User, { foreignKey: "id" });

module.exports = User;
