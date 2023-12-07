// CREATE TABLE Schools (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   school_name VARCHAR(50) NOT NULL
// );

import { Model, DataTypes } from "sequelize";
import connection from "../connection.js";

const init_schools = (sequelize, Types) => {
  class School extends Model {
    static associate(models) {
      this.hasMany(models.Major, {
        foreignKey: "school_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Lab, {
        foreignKey: "school_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  School.init(
    {
      school_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize, // Sequelize knows which instance to attach the model to.
      modelName: "School",
      tableName: "Schools",
      charset: "utf8",
      collate: "utf8_general_ci",
      // table will use the UTF-8 character set, and case-insensitive comparisons will be used when querying data.
    }
  );

  return School;
};

const adminSchool = init_schools(connection.adminSequelize, DataTypes);
const readerSchool = init_schools(connection.readerSequelize, DataTypes);
const studentSchool = init_schools(connection.studentSequelize, DataTypes);
const researcherSchool = init_schools(
  connection.researcherSequelize,
  DataTypes
);
const labManagerSchool = init_schools(
  connection.labManagerSequelize,
  DataTypes
);
const bannedSchool = init_schools(connection.bannedSequelize, DataTypes);

const Schools = {
  adminSchool,
  readerSchool,
  studentSchool,
  researcherSchool,
  labManagerSchool,
  bannedSchool,
};

export default Schools;
