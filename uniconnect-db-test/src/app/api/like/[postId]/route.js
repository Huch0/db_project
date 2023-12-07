// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import {
  createLikesByUserIdAndPostId,
  deleteLikesByUserIdAndPostId,
  getLikesByPostId,
} from "@/../db/api/like";
import { parse } from "url";

export async function GET(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const likes = await getLikesByPostId(selectedRole, params.postId);
  return NextResponse.json(likes);
}

export async function POST(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const { user_id } = await Request.json();
  await createLikesByUserIdAndPostId(selectedRole, user_id, params.postId);
  return GET(Request, { params });
}

export async function DELETE(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const { user_id } = await Request.json();
  await deleteLikesByUserIdAndPostId(selectedRole, user_id, params.postId);
  return GET(Request, { params });
}
