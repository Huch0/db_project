import { Likes } from "../models/index.js";

export async function getLikesByPostId(selectedRole, id) {
  const Like = selectLike(selectedRole);

  const likes = await Like.findAll({
    where: {
      post_id: id,
    },
    order: [["createdAt", "DESC"]],
  });

  return likes;
}

export async function createLikesByUserIdAndPostId(
  selectedRole,
  user_id,
  post_id
) {
  const Like = selectLike(selectedRole);

  await Like.create({
    user_id: user_id,
    post_id: post_id,
  });
  return;
}

export async function deleteLikesByUserIdAndPostId(
  selectedRole,
  user_id,
  post_id
) {
  const Like = selectLike(selectedRole);

  await Like.destroy({
    where: {
      user_id: user_id,
      post_id: post_id,
    },
  });

  return;
}

function selectLike(selectedRole) {
  let Like = null;

  switch (selectedRole) {
    case "admin":
      Like = Likes.adminLike;
      break;
    case "reader":
      Like = Likes.readerLike;
      break;
    case "student":
      Like = Likes.studentLike;
      break;
    case "researcher":
      Like = Likes.researcherLike;
      break;
    case "lab_manager":
      Like = Likes.labManagerLike;
      break;
    case "banned":
      Like = Likes.bannedLike;
      break;
    default:
      throw new Error("Invalid role");
  }

  return Like;
}
