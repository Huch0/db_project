// CREATE TABLE Profiles (
//     user_id INT PRIMARY KEY,
//     school_id INT,
//     major_id INT,
//     lab_id INT,
//     degree ENUM('undergraduate', 'master', 'doctoral', 'professor'),

//     FOREIGN KEY (user_id) REFERENCES Users(id),
//     FOREIGN KEY (school_id) REFERENCES Schools(id),
//     FOREIGN KEY (major_id) REFERENCES Majors(id),
//     FOREIGN KEY (lab_id) REFERENCES Labs(id)
// );
import { Model, DataTypes } from "sequelize";
import connection from "../connection.js";

const init_profiles = (sequelize, Types) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.School, {
        foreignKey: "school_id",
        targetKey: "id",
      });
      this.belongsTo(models.Major, {
        foreignKey: "major_id",
        targetKey: "id",
      });
      this.belongsTo(models.Lab, {
        foreignKey: "lab_id",
        targetKey: "id",
      });
    }
  }
  Profile.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      school_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Schools",
          key: "id",
        },
      },
      major_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Majors",
          key: "id",
        },
      },
      lab_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Labs",
          key: "id",
        },
      },
      degree: {
        type: DataTypes.ENUM(
          "undergraduate",
          "master",
          "doctoral",
          "professor"
        ),
        defaultValue: "undergraduate",
        allowNull: true,
      },
    },
    {
      sequelize, // Sequelize knows which instance to attach the model to.
      modelName: "Profile",
      tableName: "Profiles",
      charset: "utf8",
      collate: "utf8_general_ci",
      // table will use the UTF-8 character set, and case-insensitive comparisons will be used when querying data.
    }
  );

  return Profile;
};

const adminProfile = init_profiles(connection.adminSequelize, DataTypes);
const readerProfile = init_profiles(connection.readerSequelize, DataTypes);
const studentProfile = init_profiles(connection.studentSequelize, DataTypes);
const researcherProfile = init_profiles(
  connection.researcherSequelize,
  DataTypes
);
const labManagerProfile = init_profiles(
  connection.labManagerSequelize,
  DataTypes
);
const bannedProfile = init_profiles(connection.bannedSequelize, DataTypes);

const Profiles = {
  adminProfile,
  readerProfile,
  studentProfile,
  researcherProfile,
  labManagerProfile,
  bannedProfile,
};

export default Profiles;
