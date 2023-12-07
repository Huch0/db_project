// CREATE TABEL Majors (
//     id INT PRIMARY KEY,
//     major_name VARCHAR(50) NOT NULL,
//     school_id INT,
//           FOREIGN KEY (school_id) REFERENCES Schools(id),
//     )

import { Model, DataTypes } from "sequelize";
import connection from "../connection.js";

const init_majors = (sequelize, Types) => {
  class Major extends Model {
    static associate(models) {
      this.belongsTo(models.School, {
        foreignKey: "school_id",
        targetKey: "id",
      });
    }
  }
  Major.init(
    {
      major_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      school_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize, // Sequelize knows which instance to attach the model to.
      modelName: "Major",
      tableName: "Majors",
      charset: "utf8",
      collate: "utf8_general_ci",
      // table will use the UTF-8 character set, and case-insensitive comparisons will be used when querying data.
    }
  );

  return Major;
};

const adminMajor = init_majors(connection.adminSequelize, DataTypes);
const readerMajor = init_majors(connection.readerSequelize, DataTypes);
const studentMajor = init_majors(connection.studentSequelize, DataTypes);
const researcherMajor = init_majors(connection.researcherSequelize, DataTypes);
const labManagerMajor = init_majors(connection.labManagerSequelize, DataTypes);
const bannedMajor = init_majors(connection.bannedSequelize, DataTypes);

const Majors = {
  adminMajor,
  readerMajor,
  studentMajor,
  researcherMajor,
  labManagerMajor,
  bannedMajor,
};

export default Majors;
