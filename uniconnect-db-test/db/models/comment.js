// CREATE TABLE Comments (
//   id INT PRIMARY KEY,
//   post_id INT,
//   author_id INT,
//   content TEXT,
//   FOREIGN KEY (post_id) REFERENCES Posts(id),
//   FOREIGN KEY (author_id) REFERENCES Users(id)
// );

import { Model, DataTypes } from "sequelize";
import connection from "../connection.js";

const init_comments = (sequelize, Types) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: "post_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.User, {
        foreignKey: "author_id",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize, // Sequelize knows which instance to attach the model to.
      modelName: "Comment",
      tableName: "Comments",
      charset: "utf8",
      collate: "utf8_general_ci",
      // table will use the UTF-8 character set, and case-insensitive comparisons will be used when querying data.
    }
  );

  return Comment;
};

const adminComment = init_comments(connection.adminSequelize, DataTypes);
const readerComment = init_comments(connection.readerSequelize, DataTypes);
const studentComment = init_comments(connection.studentSequelize, DataTypes);
const researcherComment = init_comments(
  connection.researcherSequelize,
  DataTypes
);
const labManagerComment = init_comments(
  connection.labManagerSequelize,
  DataTypes
);
const bannedComment = init_comments(connection.bannedSequelize, DataTypes);

const Comments = {
  adminComment,
  readerComment,
  studentComment,
  researcherComment,
  labManagerComment,
  bannedComment,
};

export default Comments;
