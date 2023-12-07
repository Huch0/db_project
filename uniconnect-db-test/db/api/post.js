import { Posts } from "../models/index.js";

export async function getAllPosts(selectedRole) {
  const Post = selectPost(selectedRole);

  const posts = await Post.findAll({
    order: [["createdAt", "DESC"]],
  });
  return posts;
}

export async function getPostByAuthorId(selectedRole, id) {
  const Post = selectPost(selectedRole);

  const post = await Post.findAll({
    where: {
      author_id: id,
    },
    order: [["createdAt", "DESC"]],
  });

  return post;
}

export async function addPostByAuthorId(selectedRole, id, title, content) {
  const Post = selectPost(selectedRole);

  const post = await Post.create({
    author_id: id,
    title: title,
    content: content,
  });

  return post;
}

function selectPost(selectedRole) {
  let Post = null;

  switch (selectedRole) {
    case "admin":
      Post = Posts.adminPost;
      break;
    case "reader":
      Post = Posts.readerPost;
      break;
    case "student":
      Post = Posts.studentPost;
      break;
    case "researcher":
      Post = Posts.researcherPost;
      break;
    case "lab_manager":
      Post = Posts.labManagerPost;
      break;
    case "banned":
      Post = Posts.bannedPost;
      break;
    default:
      throw new Error("Invalid role");
  }
  return Post;
}
