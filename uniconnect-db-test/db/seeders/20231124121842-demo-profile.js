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
      "Profiles",
      [
        {
          // 허치영 프로필
          user_id: 1,
          school_id: 1, // 부산대학교
          major_id: 1, // 정보컴퓨터공학부
          lab_id: 1, // 데이터인텔리전스 연구실
          degree: "master",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 하현진 프로필
          user_id: 2,
          school_id: 1, // 부산대학교
          major_id: 1, // 정보컴퓨터공학부
          degree: "undergraduate",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // Cho Joon Soo 프로필
          user_id: 3,
          school_id: 1, // 부산대학교
          major_id: 1, // 정보컴퓨터공학부
          lab_id: 1, // 데이터인텔리전스 연구실
          degree: "professor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 서 준 프로필
          user_id: 4,
          school_id: 1, // 부산대학교
          major_id: 2, // 수학과
          degree: "undergraduate",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 주우성 프로필
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 김민혁 프로필
          user_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 이근우 프로필
          user_id: 7,
          school_id: 1, // 부산대학교
          major_id: 1, // 정보컴퓨터공학부
          lab_id: 2, // 연결 지능 시스템 연구실
          degree: "doctoral",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // 악질 유저 프로필
          user_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Profiles", null, {});
  },
};
