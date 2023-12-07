// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { getCommentsByPostId, createComment } from "@/../db/api/comment";
import { parse } from "url";

export async function GET(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const comments = await getCommentsByPostId(selectedRole, params.postId);

  return NextResponse.json(comments);
}

export async function POST(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;
  const { content, author_id } = await Request.json();

  const newComment = await createComment(selectedRole, {
    content: content,
    author_id: author_id,
    post_id: params.postId,
  });

  const comments = await getCommentsByPostId(selectedRole, params.postId);

  return NextResponse.json(comments);
}
