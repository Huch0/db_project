import { Posts } from "../models/index.js";

export async function deletePostByPostId(selectedRole, id) {
  const Post = setPost(selectedRole);

  const post = await Post.destroy({
    where: {
      id: id,
    },
  });

  return post;
}

export async function editPostByPostId(selectedRole, id, title, content) {
  const Post = setPost(selectedRole);

  const post = await Post.update(
    {
      title: title,
      content: content,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return post;
}

function setPost(selectedRole) {
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
