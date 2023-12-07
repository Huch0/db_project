// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { getContactsByLabId } from "@/../db/api/contact";
import { getLabByManagerId } from "@/../db/api/lab";
import { parse } from "url";

export async function GET(Request, { params }) {
  const { query } = parse(Request.url, true);
  const selectedRole = query.selectedRole;

  const lab = await getLabByManagerId(selectedRole, params.managerId);

  const contacts = await getContactsByLabId(selectedRole, lab.id);

  //console.log(users);

  return NextResponse.json(contacts);
}
