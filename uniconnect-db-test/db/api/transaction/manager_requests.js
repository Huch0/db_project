import { Manager_requests, Users, Labs } from "../../models/index.js";
import connection from "../../connection.js";

export async function getAllManager_requests(selectedRole) {
  const connectionConfig = selectConnection(selectedRole);
  const Manager_request = connectionConfig.Manager_request;

  const manager_requests = await Manager_request.findAll({
    order: [["createdAt", "DESC"]],
  });

  return manager_requests;
}

export async function createManager_request(selectedRole, manager_request) {
  const connectionConfig = selectConnection(selectedRole);
  const Manager_request = connectionConfig.Manager_request;

  const newManager_request = await Manager_request.create({
    user_id: manager_request.user_id,
    lab_id: manager_request.lab_id,
  });

  return newManager_request;
}

export async function manageManager_request(selectedRole, mangage_request) {
  const connectionConfig = selectConnection(selectedRole);
  const transaction = await connectionConfig.roleConnection.transaction();
  
  const status = mangage_request.status;
  const user_id = mangage_request.user_id;
  const lab_id = mangage_request.lab_id;

  try {
    if (status === "cancled") {
      const cancleManager_request = await connectionConfig.Manager_request.destroy({
        where: { user_id: user_id },
        transaction: transaction
      });
      await transaction.commit();
      
      return cancleManager_request;

    } else if (status === "confirmed") {
      const lab = await connectionConfig.Lab.findOne({ where: { id: lab_id }, transaction: transaction });
      if (lab.manager_id) {
        await connectionConfig.User.update({ role: "researcher" }, { where: { id: lab.manager_id }, transaction: transaction });
      }
      
      await connectionConfig.User.update({ role: "lab_manager" }, { where: { id: user_id }, transaction: transaction });
      await connectionConfig.Lab.update({ manager_id: user_id }, { where: { id: lab_id }, transaction: transaction });
      await connectionConfig.Manager_request.destroy({ where: { user_id: user_id }, transaction: transaction });
      await transaction.commit();
    }
    const updatedRequestsList = await getAllManager_requests(selectedRole);
    return updatedRequestsList;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}


function selectConnection(selectedRole) {
  let roleConnection = null;
  let Manager_request = null;
  let Lab = null;
  let User = null;

  switch (selectedRole) {
    case "admin":
      roleConnection = connection.adminSequelize;
      Manager_request = Manager_requests.adminManager_request;
      User = Users.adminUser;
      Lab = Labs.adminLab;
      break;
    case "reader":
      roleConnection = connection.readerSequelize;
      Manager_request = Manager_requests.readerManager_request;
      User = Users.readerUser;
      Lab = Labs.readerLab;
      break;
    case "student":
      roleConnection = connection.studentSequelize;
      Manager_request = Manager_requests.studentManager_request;
      User = Users.studentUser;
      Lab = Labs.studentLab;
      break;
    case "researcher":
      roleConnection = connection.researcherSequelize;
      Manager_request = Manager_requests.researcherManager_request;
      User = Users.researcherUser;
      Lab = Labs.researcherLab;
      break;
    case "lab_manager":
      roleConnection = connection.labManagerSequelize;
      Manager_request = Manager_requests.labManagerManager_request;
      User = Users.labManagerUser;
      Lab = Labs.labManagerLab;
      break;
    case "banned":
      roleConnection = connection.bannedSequelize;
      Manager_request = Manager_requests.bannedManager_request;
      User = Users.bannedUser;
      Lab = Labs.bannedLab;
      break;
    default:
      throw new Error("Invalid role");
  }

  const connectionConfig = {
    roleConnection: roleConnection,
    Manager_request: Manager_request,
    User: User,
    Lab : Lab
  };

  return connectionConfig;
}