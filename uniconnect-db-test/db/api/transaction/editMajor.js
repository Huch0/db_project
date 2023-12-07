// 1. major_name이 이미 존재하는 지 확인
// 1-1. 존재한다면, major_id를 가져옴
// 1-2. 존재하지 않는다면, 새로운 major를 생성하고 major_id를 가져옴

// 2. user의 id로 프로필을 가져옴
// 3. user의 role을 확인
// 3-1. (student, researcher, lab_manager) 중 하나라면, 5번으로 이동
// 3-2. 아니라면, user의 role을 student로 변경, degree를 undergraduate로 변경

// 4. 프로필의 major_id를 변경

// 5. update된 프로필을 반환

import { Majors, Profiles, Users } from "../../models/index.js";
import connection from "../../connection.js";

export async function editMajorAndRole(selectedRole, user_id, major_name) {
  const connectionConfig = selectConnection(selectedRole);

  const transaction = await connectionConfig.roleConnection.transaction();

  try {
    // 1. major_name이 이미 존재하는 지 확인
    let major = await connectionConfig.Major.findOne(
      {
        where: { major_name: major_name },
      },
      { transaction: transaction }
    );

    // 1-1. 존재한다면, major_id를 가져옴
    // 1-2. 존재하지 않는다면, 새로운 major를 생성하고 major_id를 가져옴
    if (!major) {
      major = await connectionConfig.Major.create(
        {
          major_name: major_name,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction: transaction }
      );
    }

    // 2. user의 id로 프로필을 가져옴
    const profile = await connectionConfig.Profile.findOne(
      {
        where: { user_id: user_id },
      },
      { transaction: transaction }
    );
    // 3. user의 role을 확인
    // 3-1. (student, researcher, lab_manager) 중 하나라면, 5번으로 이동
    if (
      selectedRole === "student" ||
      selectedRole === "researcher" ||
      selectedRole === "lab_manager"
    ) {
      // 4. 프로필의 major_id를 변경
      await profile.update(
        {
          major_id: major.id,
          updatedAt: new Date(),
        },
        { transaction: transaction }
      );
      // 5. update된 프로필을 반환
      await transaction.commit();
    } else {
      // 3-2. 아니라면, user의 role을 student로 변경, degree를 undergraduate로 변경
      // 4. 프로필의 major_id를 변경
      await profile.update(
        {
          major_id: major.id,
          degree: "undergraduate",
          updatedAt: new Date(),
        },
        { transaction: transaction }
      );
      const user = await connectionConfig.User.findOne(
        {
          where: { id: user_id },
        },
        { transaction: transaction }
      );

      await user.update(
        {
          role: "student",
          updatedAt: new Date(),
        },
        { transaction: transaction }
      );

      await transaction.commit();
    }
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }

  const updatedProfile = await connectionConfig.Profile.findOne({
    where: { user_id: user_id },
  });

  return updatedProfile;
}

function selectConnection(selectedRole) {
  let roleConnection = null;
  let Major = null;
  let Profile = null;
  let User = null;

  switch (selectedRole) {
    case "admin":
      roleConnection = connection.adminSequelize;
      Major = Majors.adminMajor;
      Profile = Profiles.adminProfile;
      User = Users.adminUser;
      break;
    case "reader":
      roleConnection = connection.readerSequelize;
      Major = Majors.readerMajor;
      Profile = Profiles.readerProfile;
      User = Users.readerUser;
      break;
    case "student":
      roleConnection = connection.studentSequelize;
      Major = Majors.studentMajor;
      Profile = Profiles.studentProfile;
      User = Users.studentUser;
      break;
    case "researcher":
      roleConnection = connection.researcherSequelize;
      Major = Majors.researcherMajor;
      Profile = Profiles.researcherProfile;
      User = Users.researcherUser;
      break;
    case "lab_manager":
      roleConnection = connection.labManagerSequelize;
      Major = Majors.labManagerMajor;
      Profile = Profiles.labManagerProfile;
      User = Users.labManagerUser;
      break;
    case "banned":
      roleConnection = connection.bannedSequelize;
      Major = Majors.bannedMajor;
      Profile = Profiles.bannedProfile;
      User = Users.bannedUser;
      break;
    default:
      throw new Error("Invalid role");
  }

  const connectionConfig = {
    roleConnection: roleConnection,
    Major: Major,
    Profile: Profile,
    User: User,
  };

  return connectionConfig;
}
