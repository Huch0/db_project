// CREATE TABLE Likes (
//   post_id INT,
//   user_id INT,
//   PRIMARY KEY (post_id, user_id),
//   FOREIGN KEY (post_id) REFERENCES Posts(id),
//   FOREIGN KEY (user_id) REFERENCES Users(id)
// );

import { Model, DataTypes } from "sequelize";
import connection from "../connection.js";

const init_likes = (sequelize, Types) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: "post_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  Like.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
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
    },
    {
      sequelize, // Sequelize knows which instance to attach the model to.
      modelName: "Like",
      tableName: "Likes",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      // table will use the UTF-8 character set, and case-insensitive comparisons will be used when querying data.
    }
  );

  return Like;
};

const adminLike = init_likes(connection.adminSequelize, DataTypes);
const readerLike = init_likes(connection.readerSequelize, DataTypes);
const studentLike = init_likes(connection.studentSequelize, DataTypes);
const researcherLike = init_likes(connection.researcherSequelize, DataTypes);
const labManagerLike = init_likes(connection.labManagerSequelize, DataTypes);
const bannedLike = init_likes(connection.bannedSequelize, DataTypes);

const Likes = {
  adminLike,
  readerLike,
  studentLike,
  researcherLike,
  labManagerLike,
  bannedLike,
};

export default Likes;
