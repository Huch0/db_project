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
      "Labs",
      [
        {
          id: 1,
          lab_name: "데이터인텔리전스 연구실 (Data Intelligence Lab.)",
          description:
            "Data Intelligence Lab. at Pusan National Univ., led by Prof. Junsu Cho, is a research group dedicated to the study of artificial intelligence and data mining. ",
          manager_id: 3,
          school_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          lab_name: "연결 지능 시스템 연구실",
          description:
            "연결 지능 시스템(CIS) 연구실은 다양한 요구조건 및 운영환경에 최적화된 무선 네트워크 기술을 연구하고, 무선으로 수집한 빅 데이터를 활용하여 고도의 지능형 자율 시스템을 개발하는 연구를 진행하고 있습니다.",
          school_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.sequelize.query(
      `SELECT setval('"Labs_id_seq"', (SELECT MAX(id) FROM "Labs"));`
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Labs", null, {});
  },
};
