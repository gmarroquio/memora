import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await db.insert(usersTable).values({
    name: body.name,
    id: body.userId,
    email: body.email,
    phoneNumber: body.phoneNumber,
  });

  return NextResponse.json({ message: "User created" });
}
