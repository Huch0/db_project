"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Contacts",
      [
        {
          student_id: 2, // 하현진
          lab_id: 1, // 데이터인텔리전스 연구실
          status: "pending",
          portfolio_path: "fake/path",
          createdAt: new Date(),
        },
        {
          student_id: 4, // 서 준
          lab_id: 1, // 데이터인텔리전스 연구실
          status: "pending",
          portfolio_path: "fake/path",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Contacts", null, {});
  },
};
