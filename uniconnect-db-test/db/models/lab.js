// CREATE TABLE Labs (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     lab_name VARCHAR(50) NOT NULL,
//     description TEXT,
//     manager_id INT,
//     school_id INT,
//   FOREIGN KEY (manager_id) REFERENCES Users(id),
//   FOREIGN KEY (school_id) REFERENCES Schools(id)
// );

import { Model, DataTypes } from "sequelize";
import connection from "../connection.js";

const init_labs = (sequelize, Types) => {
  class Lab extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "manager_id",
        targetKey: "id",
      });
      this.belongsTo(models.School, {
        foreignKey: "school_id",
        targetKey: "id",
      });
    }
  }
  Lab.init(
    {
      lab_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      school_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize, // Sequelize knows which instance to attach the model to.
      modelName: "Lab",
      tableName: "Labs",
      charset: "utf8",
      collate: "utf8_general_ci",
      // table will use the UTF-8 character set, and case-insensitive comparisons will be used when querying data.
    }
  );

  return Lab;
};

const adminLab = init_labs(connection.adminSequelize, DataTypes);
const readerLab = init_labs(connection.readerSequelize, DataTypes);
const studentLab = init_labs(connection.studentSequelize, DataTypes);
const researcherLab = init_labs(connection.researcherSequelize, DataTypes);
const labManagerLab = init_labs(connection.labManagerSequelize, DataTypes);
const bannedLab = init_labs(connection.bannedSequelize, DataTypes);

const Labs = {
  adminLab,
  readerLab,
  studentLab,
  researcherLab,
  labManagerLab,
  bannedLab,
};

export default Labs;
