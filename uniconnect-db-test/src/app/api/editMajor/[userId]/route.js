// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { editMajorAndRole } from "@/../db/api/transaction/editMajor.js";

import { parse } from "url";

export async function POST(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const { user_id, major_name } = await Request.json();

  const updatedProfile = await editMajorAndRole(
    selectedRole,
    user_id,
    major_name
  );

  return NextResponse.json(updatedProfile);
}
