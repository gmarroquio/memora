import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
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

export async function GET(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  await db.update(usersTable).set({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  return NextResponse.json({ message: "User updated" });
}
