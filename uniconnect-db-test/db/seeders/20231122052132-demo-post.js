"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          id: 1,
          author_id: 3, // Cho Joon Soo
          title:
            "Dynamic Multi-Behavior Sequence Modeling for Next Item recommendation",
          content:
            '안녕하세요, 개발자 여러분! 오늘은 현대 추천 시스템에서 주목받고 있는 주제 중 하나인 "Dynamic Multi-Behavior Sequence Modeling for Next Item Recommendation"에 대해 이야기해보려고 합니다. 🌐\n\n' +
            "1. 🧠 이 주제의 핵심 아이디어:\n" +
            "이 연구는 사용자의 다양한 행동 시퀀스를 모델링하여 다음 아이템 추천을 개선하는 것을 목표로 합니다. 사용자의 행동 패턴은 동적이고 다양하기 때문에 이를 효과적으로 다루는 것이 중요합니다.\n\n" +
            "2. 🔄 다이내믹 모델링의 필요성:\n" +
            "과거의 추천 시스템은 정적인 사용자 프로파일을 기반으로 추천을 제공했지만, 다이내믹 다중 행동 시퀀스 모델링은 사용자의 행동이 변화함에 따라 적응할 수 있는 능력을 가지고 있습니다. 이는 실제 상황에 더 부합하며 정확한 추천을 가능케 합니다.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          author_id: 1, // 허치영
          title: "🤖 머신러닝 간단 정리 🤖",
          content:
            "안녕하세요! 컴퓨터 공학 학생이자 머신러닝에 흥미를 가진 개발자 여러분! 🚀\n" +
            "머신러닝은 데이터를 기반으로 컴퓨터에 학습을 시켜 스스로 패턴을 찾고 예측을 수행하는 분야입니다. 여러분이 사용하는 얼굴 인식, 음성 인식, 추천 알고리즘 등은 모두 머신러닝의 일부분이죠.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.sequelize.query(
      `SELECT setval('"Posts_id_seq"', (SELECT MAX(id) FROM "Posts"));`
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
