import { Schools } from "../models/index.js";

export async function getSchoolById(selectedRole, id) {
  const School = selectSchool(selectedRole);

  const school = await School.findOne({
    where: {
      id: id,
    },
  });

  return school;
}

function selectSchool(selectedRole) {
  let School = null;

  switch (selectedRole) {
    case "admin":
      School = Schools.adminSchool;
      break;
    case "reader":
      School = Schools.readerSchool;
      break;
    case "student":
      School = Schools.studentSchool;
      break;
    case "researcher":
      School = Schools.researcherSchool;
      break;
    case "lab_manager":
      School = Schools.labManagerSchool;
      break;
    case "banned":
      School = Schools.bannedSchool;
      break;
    default:
      throw new Error("Invalid role");
  }

  return School;
}
