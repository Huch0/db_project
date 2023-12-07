import { Profiles } from "../models/index.js";

export async function getProfileByUserId(selectedRole, id) {
  const Profile = selectProfile(selectedRole);

  const profile = await Profile.findOne({
    where: {
      user_id: id,
    },
  });

  return profile;
}

export async function editDegreeByUserId(selectedRole, user_id, degree) {
  const Profile = selectProfile(selectedRole);

  const updatedProfile = await Profile.update(
    { degree: degree },
    {
      where: {
        user_id: user_id,
      },
    }
  );

  return getProfileByUserId(selectedRole, user_id);
}

function selectProfile(selectedRole) {
  let Profile = null;

  switch (selectedRole) {
    case "admin":
      Profile = Profiles.adminProfile;
      break;
    case "reader":
      Profile = Profiles.readerProfile;
      break;
    case "student":
      Profile = Profiles.studentProfile;
      break;
    case "researcher":
      Profile = Profiles.researcherProfile;
      break;
    case "lab_manager":
      Profile = Profiles.labManagerProfile;
      break;
    case "banned":
      Profile = Profiles.bannedProfile;
      break;
    default:
      throw new Error("Invalid role");
  }

  return Profile;
}
