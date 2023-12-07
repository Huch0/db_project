// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import {
  deletePostByPostId,
  editPostByPostId,
} from "@/../db/api/post_delete_edit";
import { getAllPosts } from "@/../db/api/post";

import { parse } from "url";

export async function POST(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const postId = params.postId;
  const { title, content } = await Request.json();

  const updatedPost = await editPostByPostId(
    selectedRole,
    postId,
    title,
    content
  );

  const updatedPostsList = await getAllPosts(selectedRole);

  return NextResponse.json(updatedPostsList);
}

export async function DELETE(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const postId = params.postId;
  await deletePostByPostId(selectedRole, postId);

  const updatedPostsList = await getAllPosts(selectedRole);

  return NextResponse.json(updatedPostsList);
}
