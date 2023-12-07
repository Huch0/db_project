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
      "Comments",
      [
        {
          id: 1,
          author_id: 1, // 허치영
          post_id: 1, // Cho Joon Soo의 게시글
          content: "너무 훌륭한 글입니다.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          author_id: 2, // 하현진
          post_id: 1, // Cho Joon Soo의 게시글
          content: "저도 추천 시스템에 대해서 자세히 알고싶어요.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          author_id: 4, // 서 준
          post_id: 1, // Cho Joon Soo의 게시글
          content: "SNS에 게시글 추천에도 적용할 수 있을 것 같네요.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          author_id: 5, // 주우성
          post_id: 2, // 허치영의 게시글
          content: "이 글을 읽고 머신러닝을 마스터했습니다.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          author_id: 7, // 이근우
          post_id: 2, // 허치영의 게시글
          content: "정말 감사합니다 T.T",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.sequelize.query(
      `SELECT setval('"Comments_id_seq"', (SELECT MAX(id) FROM "Comments"));`
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
