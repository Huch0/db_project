// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

import { NextResponse } from "next/server";
import { getLabByManagerId } from "@/../db/api/lab";

export async function GET(Request, { params }) {
  const lab = await getLabByManagerId(params.managerId);

  //console.log(users);

  return NextResponse.json(lab);
}
