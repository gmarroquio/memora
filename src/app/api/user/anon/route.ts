import { db } from "@/db";
import { anonUsersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.id)
      return NextResponse.json(
        { message: "Name and id required" },
        { status: 400 }
      );

    const [exists] = await db
      .select()
      .from(anonUsersTable)
      .where(eq(anonUsersTable.id, body.id));

    if (exists)
      return NextResponse.json({ message: "Anon user already exists!" });

    await db.insert(anonUsersTable).values({ id: body.id, name: body.name });
    return NextResponse.json({ message: "Anon user created!" });
  } catch {
    return NextResponse.json(
      { message: "Error creating anon user" },
      { status: 500 }
    );
  }
}
