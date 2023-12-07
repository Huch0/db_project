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
    await queryInterface.bulkInsert("Manager_requests", [
      {
        id: 1,
        user_id: 7,
        lab_id: 2,
        createdAt: new Date(),
      },
    ]);
    await queryInterface.sequelize.query(
      `SELECT setval('"Manager_requests_id_seq"', (SELECT MAX(id) FROM "Manager_requests"));`
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Manager_requests", null, {});
  },
};
