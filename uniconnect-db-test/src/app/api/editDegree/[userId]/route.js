// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { editDegreeAndRole } from "@/../db/api/transaction/editDegree";
import { parse } from "url";

export async function POST(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;
  const user_id = params.userId;

  const { degree } = await Request.json();

  const updatedProfile = await editDegreeAndRole(selectedRole, user_id, degree);

  return NextResponse.json(updatedProfile);
}
