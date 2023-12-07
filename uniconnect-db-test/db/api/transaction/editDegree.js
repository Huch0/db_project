// 1. profile의 major_id를 변경
// 2. user의 role을 확인
// 2-1. (researcher, lab_manager) 중 하나라면, 4번으로 이동
// 2-2. 아니라면, user의 role을 researcher로 변경
// 3. update된 프로필을 반환

import { Profiles, Users } from "../../models/index.js";
import connection from "../../connection.js";

export async function editDegreeAndRole(selectedRole, user_id, degree) {
  const connectionConfig = selectConnection(selectedRole);
  //   console.log(connectionConfig);

  const transaction = await connectionConfig.roleConnection.transaction();

  try {
    // 1. profile의 major_id를 변경
    await connectionConfig.Profile.update(
      {
        degree: degree,
        updatedAt: new Date(),
      },
      { where: { user_id: user_id } },
      { transaction: transaction }
    );

    // 2. user의 role을 확인
    // 2-1. (researcher, lab_manager) 중 하나라면, 4번으로 이동
    // 2-2. 아니라면, user의 role을 researcher로 변경
    const user = await connectionConfig.User.findOne(
      {
        where: { id: user_id },
      },
      { transaction: transaction }
    );

    if (user.role === "researcher" || user.role === "lab_manager") {
      // 4. update된 프로필을 반환
      await transaction.commit();
    } else {
      await connectionConfig.User.update(
        {
          role: "researcher",
          updatedAt: new Date(),
        },
        { where: { id: user_id } },
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
  let Profile = null;
  let User = null;

  switch (selectedRole) {
    case "admin":
      roleConnection = connection.adminSequelize;
      Profile = Profiles.adminProfile;
      User = Users.adminUser;
      break;
    case "reader":
      roleConnection = connection.readerSequelize;
      Profile = Profiles.readerProfile;
      User = Users.readerUser;
      break;
    case "student":
      roleConnection = connection.studentSequelize;
      Profile = Profiles.studentProfile;
      User = Users.studentUser;
      break;
    case "researcher":
      roleConnection = connection.researcherSequelize;
      Profile = Profiles.researcherProfile;
      User = Users.researcherUser;
      break;
    case "lab_manager":
      roleConnection = connection.labManagerSequelize;
      Profile = Profiles.labManagerProfile;
      User = Users.labManagerUser;
      break;
    case "banned":
      roleConnection = connection.bannedSequelize;
      Profile = Profiles.bannedProfile;
      User = Users.bannedUser;
      break;
    default:
      throw new Error("Invalid role");
  }

  const connectionConfig = {
    roleConnection: roleConnection,
    Profile: Profile,
    User: User,
  };

  return connectionConfig;
}
