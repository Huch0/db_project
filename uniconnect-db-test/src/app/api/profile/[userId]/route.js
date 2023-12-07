// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { editDegreeByUserId, getProfileByUserId } from "@/../db/api/profile";
import { parse } from "url";

export async function GET(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const profile = await getProfileByUserId(selectedRole, params.userId);

  //console.log(users);

  return NextResponse.json(profile);
}

export async function POST(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const user_id = params.userId;
  const { degree } = await Request.json();

  const updatedProfile = await editDegreeByUserId(
    selectedRole,
    user_id,
    degree
  );

  return NextResponse.json(updatedProfile);
}
