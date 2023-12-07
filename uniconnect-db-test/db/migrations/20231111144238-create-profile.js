"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Profiles", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      school_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Schools",
          key: "id",
        },
      },
      major_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Majors",
          key: "id",
        },
      },
      lab_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Labs",
          key: "id",
        },
      },
      degree: {
        type: Sequelize.ENUM(
          "undergraduate",
          "master",
          "doctoral",
          "professor"
        ),
        defaultValue: "undergraduate",
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Profiles");
  },
};
