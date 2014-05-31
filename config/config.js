require("dotenv").config();

const { DEV_DATABASE_URL, CLEARDB_DATABASE_URL, TEST_DATABASE_URL } =
  process.env;

module.exports = {
  development: {
    url: DEV_DATABASE_URL,
    dialect: "mysql",
    logging: false,
    seederStorage: "sequelize",
  },
  test: {
    url: TEST_DATABASE_URL,
    dialect: "mysql",
    logging: false,
  },
  production: {
    url: CLEARDB_DATABASE_URL,
    dialect: "mysql",
    use_env_variable: "CLEARDB_DATABASE_URL",
    logging: false,
    ssl: true,
    seederStorage: "json",
  },
};
