"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = require("./user");

const UserData = sequelize.define("UserData", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    references: {
      model: "UserData",
      key: "id",
    },
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  companyName: DataTypes.STRING,
  addressCountry: DataTypes.STRING,
  addressStreet: DataTypes.STRING,
  addressZip: DataTypes.STRING,
  addressCity: DataTypes.STRING,
});

// UserData.hasOne(User);

module.exports = UserData;
