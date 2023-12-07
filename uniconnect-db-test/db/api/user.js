import { Users } from "../models/index.js";

export async function getAllUsers(selectedRole) {
  const User = selectUser(selectedRole);

  const users = await User.findAll({
    order: [["createdAt", "DESC"]],
  });

  return users;
}

export async function getUserById(selectedRole, id) {
  const User = selectUser(selectedRole);

  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  return user;
}

export async function banUser(selectedRole, user_id) {
  const User = selectUser(selectedRole);

  const user = await User.findOne({
    where: {
      id: user_id,
    },
  });

  user.role = "banned";

  await user.save();

  return user;
}

export async function unBanUser(selectedRole, user_id) {
  const User = selectUser(selectedRole);

  const user = await User.findOne({
    where: {
      id: user_id,
    },
  });

  user.role = "reader";

  await user.save();

  return user;
}

function selectUser(selectedRole) {
  let User = null;

  switch (selectedRole) {
    case "admin":
      User = Users.adminUser;
      break;
    case "reader":
      User = Users.readerUser;
      break;
    case "student":
      User = Users.studentUser;
      break;
    case "researcher":
      User = Users.researcherUser;
      break;
    case "lab_manager":
      User = Users.labManagerUser;
      break;
    case "banned":
      User = Users.bannedUser;
      break;
    default:
      throw new Error("Invalid role");
  }

  return User;
}
