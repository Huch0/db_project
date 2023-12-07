import { Comments } from "../models/index.js";

export async function getCommentsByPostId(selectedRole, id) {
  const Comment = selectComment(selectedRole);

  const comments = await Comment.findAll({
    where: {
      post_id: id,
    },
    order: [["createdAt", "DESC"]],
  });

  return comments;
}

export async function createComment(selectedRole, comment) {
  const Comment = selectComment(selectedRole);
  const {content, author_id, post_id} = comment;

  const newComment = await Comment.create(
    {
      content: content,
      author_id: author_id,
      post_id: post_id,
    }
  );

  return newComment;
}

function selectComment(selectedRole) {
  let Comment = null;

  switch (selectedRole) {
    case "admin":
      Comment = Comments.adminComment;
      break;
    case "reader":
      Comment = Comments.readerComment;
      break;
    case "student":
      Comment = Comments.studentComment;
      break;
    case "researcher":
      Comment = Comments.researcherComment;
      break;
    case "lab_manager":
      Comment = Comments.labManagerComment;
      break;
    case "banned":
      Comment = Comments.bannedComment;
      break;
    default:
      throw new Error("Invalid role");
  }

  return Comment;
}