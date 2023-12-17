require("dotenv").config();

module.exports = {
  development: {
    username: "uniconnect_admin",
    password: "mudBob-sykwu4-zitxij",
    database: "db_project",
    host: "postgres",
    dialect: "postgres",
  },
  test: {
    username: "admin",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "db_test",
    host: process.env.SEQUELIZE_HOST,
    dialect: "postgres",
  },
  production: {
    username: "admin",
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE_NAME,
    host: process.env.SEQUELIZE_HOST,
    dialect: "postgres",
    logging: false,
  },
};
