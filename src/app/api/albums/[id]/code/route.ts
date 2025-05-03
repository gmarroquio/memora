import { db } from "@/db";
import { albumsTable, codesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
) => {
  const { id: albumId } = await _params;
  const userId = req.headers.get("userId");

  const [album] = await db
    .select()
    .from(albumsTable)
    .limit(1)
    .where(and(eq(albumsTable.id, albumId)));

  if (!album)
    return NextResponse.json({ message: "Album not found" }, { status: 404 });

  if (!userId) return NextResponse.json(album);

  const codes = await db
    .select()
    .from(codesTable)
    .where(and(eq(codesTable.albumId, albumId)));

  return NextResponse.json({ codes });
};

export async function POST(
  req: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
) {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });
  const { id: albumId } = await _params;

  let code = Math.random().toString(36).substring(2, 8).toUpperCase();

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
    .where(eq(albumsTable.id, albumId));

  await db.insert(codesTable).values({
    code,
    expireAt: album.endDate?.toISOString(),
    albumId: album.id,
  });

  return NextResponse.json({ code });
}
