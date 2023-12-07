// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { getUserById } from "@/../db/api/user";
import { parse } from "url";

export async function GET(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const users = await getUserById(selectedRole, params.id);

  return NextResponse.json(users);
}

export async function POST(Request, { params }) {
  const userId = params.id;
  const { degree } = await Request.json();

  const updatedUser = await editUserById(userId, degree);

  return NextResponse.json(updatedUser);
}
