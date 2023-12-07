// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { banUser, unBanUser, getAllUsers } from "@/../db/api/user";
import { parse } from "url";

export async function PUT(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const user_id = params.userId;

  const { method } = await Request.json();

  if (method === "banUser") {
    await banUser(selectedRole, user_id);
  } else if (method === "unBanUser") {
    await unBanUser(selectedRole, user_id);
  }

  const updatedUsers = await getAllUsers(selectedRole);

  return NextResponse.json(updatedUsers);
}
