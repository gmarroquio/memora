import { db } from "@/db";
import { albumsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await db.update(albumsTable).set({
    title: body.title,
  });

  return NextResponse.json({ message: "Title updated" });
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [album] = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.userId, userId));

  return NextResponse.json(album);
}
