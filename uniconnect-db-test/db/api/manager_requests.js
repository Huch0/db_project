import { Manager_requests, Users, Labs } from "../models/index.js";

export async function getAllManager_requests(selectedRole) {
  const Manager_request = setManager_request(selectedRole);

  const manager_requests = await Manager_request.findAll({
    order: [["createdAt", "DESC"]],
  });

  return manager_requests;
}

export async function createManager_request(selectedRole, manager_request) {
  const Manager_request = setManager_request(selectedRole);

  const newManager_request = await Manager_request.create({
    user_id: manager_request.user_id,
    lab_id: manager_request.lab_id,
  });

  return newManager_request;
}

export async function manageManager_request(selectedRole, mangage_request) {
  const Manager_request = setManager_request(selectedRole);
  const User = selectUser(selectedRole);
  const Lab = selectLab(selectedRole);

  const status = mangage_request.status;
  const user_id = mangage_request.user_id;
  const lab_id = mangage_request.lab_id;

  if (status === "cancled") {
    const cancleManager_request = await Manager_request.destroy({
      where: { user_id: user_id },
    });
    return cancleManager_request;
  } else if (status === "confirmed") {
    await User.update({ role: "lab_manager" }, { where: { id: user_id } });

    await Lab.update({ manager_id: user_id }, { where: { id: lab_id } });

    await Manager_request.destroy({
      where: {
        user_id: user_id,
      },
    });
  }

  const updatedRequestsList = await getAllManager_requests(selectedRole);

  return updatedRequestsList;
}

function setManager_request(selectedRole) {
  let Manager_request = null;

  switch (selectedRole) {
    case "admin":
      Manager_request = Manager_requests.adminManager_request;
      break;
    case "reader":
      Manager_request = Manager_requests.readerManager_request;
      break;
    case "student":
      Manager_request = Manager_requests.studentManager_request;
      break;
    case "researcher":
      Manager_request = Manager_requests.researcherManager_request;
      break;
    case "lab_manager":
      Manager_request = Manager_requests.labManagerManager_request;
      break;
    case "banned":
      Manager_request = Manager_requests.bannedManager_request;
      break;
    default:
      throw new Error("Invalid role");
  }

  return Manager_request;
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

function selectLab(selectedRole) {
  let Lab = null;

  switch (selectedRole) {
    case "admin":
      Lab = Labs.adminLab;
      break;
    case "reader":
      Lab = Labs.readerLab;
      break;
    case "student":
      Lab = Labs.studentLab;
      break;
    case "researcher":
      Lab = Labs.researcherLab;
      break;
    case "lab_manager":
      Lab = Labs.labManagerLab;
      break;
    case "banned":
      Lab = Labs.bannedLab;
      break;
    default:
      throw new Error("Invalid role");
  }

  return Lab;
}
