import { Labs } from "../models/index.js";

export async function getAllLabs(selectedRole) {
  const Lab = selectLab(selectedRole);

  const labs = await Lab.findAll({
    order: [["createdAt", "DESC"]],
  });

  return labs;
}

export async function getLabByManagerId(selectedRole, id) {
  const Lab = selectLab(selectedRole);

  const lab = await Lab.findOne({
    where: {
      manager_id: id,
    },
  });

  return lab;
}

export async function getLabById(selectedRole, id) {
  const Lab = selectLab(selectedRole);

  const lab = await Lab.findOne({
    where: {
      id,
    },
  });

  return lab;
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
