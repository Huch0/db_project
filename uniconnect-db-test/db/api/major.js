import { Majors } from "../models/index.js";

export async function getMajorById(selectedRole, id) {
  const Major = selectMajor(selectedRole);

  const major = await Major.findOne({
    where: {
      id: id,
    },
  });

  return major;
}

function selectMajor(selectedRole) {
  let Major = null;

  switch (selectedRole) {
    case "admin":
      Major = Majors.adminMajor;
      break;
    case "reader":
      Major = Majors.readerMajor;
      break;
    case "student":
      Major = Majors.studentMajor;
      break;
    case "researcher":
      Major = Majors.researcherMajor;
      break;
    case "lab_manager":
      Major = Majors.labManagerMajor;
      break;
    case "banned":
      Major = Majors.bannedMajor;
      break;
    default:
      throw new Error("Invalid role");
  }

  return Major;
}
