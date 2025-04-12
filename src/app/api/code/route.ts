import { db } from "@/db";
import { albumsTable, codesTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { addDays } from "date-fns";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });
  const body = await req.json();
  let code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const expires = addDays(new Date(), body.expirationDays);

  let [codeExists] = await db
    .select()
    .from(codesTable)
    .where(eq(codesTable.code, code));
  if (codeExists) {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  [codeExists] = await db
    .select()
    .from(codesTable)
    .where(eq(codesTable.code, code));

  if (codeExists) {
    return NextResponse.json(
      { message: "Code creation error. Try again later!" },
      { status: 500 }
    );
  }

  const [album] = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.userId, userId));

  await db
    .insert(codesTable)
    .values({ code, expireAt: expires.toISOString(), albumId: album.id });

  return NextResponse.json({ code });
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const [album] = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.userId, userId));

  const codes = await db
    .select()
    .from(codesTable)
    .where(eq(codesTable.albumId, album.id));

  return NextResponse.json(codes);
}
