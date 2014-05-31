const Sequelize = require("sequelize");
require("dotenv/config");

const { CLEARDB_DATABASE_URL, DEV_DATABASE_URL } = process.env;

const sequelize = new Sequelize(CLEARDB_DATABASE_URL || DEV_DATABASE_URL);

module.exports = sequelize;
