import Sequelize from "sequelize";
import pg from "pg";

const adminConfig = {
  username: "uniconnect_admin",
  password: "mudBob-sykwu4-zitxij",
  database: "db_project",
  host: "postgres",
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
};

const adminSequelize = new Sequelize(adminConfig);

const readerConfig = {
  username: "user_reader",
  database: "db_project",
  host: "postgres",
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
};

const readerSequelize = new Sequelize(readerConfig);

const studentConfig = {
  username: "user_student",
  database: "db_project",
  host: "postgres",
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
};

const studentSequelize = new Sequelize(studentConfig);

const researcherConfig = {
  username: "user_researcher",
  database: "db_project",
  host: "postgres",
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
};

const researcherSequelize = new Sequelize(researcherConfig);

const labManagerConfig = {
  username: "user_lab_manager",
  database: "db_project",
  host: "postgres",
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
};

const labManagerSequelize = new Sequelize(labManagerConfig);

const bannedConfig = {
  username: "user_banned",
  database: "db_project",
  host: "postgres",
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
};

const bannedSequelize = new Sequelize(bannedConfig);

const connection = {
  adminSequelize,
  readerSequelize,
  studentSequelize,
  researcherSequelize,
  labManagerSequelize,
  bannedSequelize,
};

export default connection;
