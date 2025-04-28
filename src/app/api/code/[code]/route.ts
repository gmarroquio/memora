import { db } from "@/db";
import { albumsTable, anonUsersTable, codesTable } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { isAfter } from "date-fns";

export async function GET(
  _: NextRequest,
  { params: _params }: { params: Promise<{ code: string }> }
) {
  const { code: incomeCode } = await _params;

  const [code] = await db
    .select()
    .from(codesTable)
    .limit(1)
    .where(eq(codesTable.code, incomeCode.toUpperCase()));

  if (!code)
    return NextResponse.json(
      { message: "Code don't exists!" },
      { status: 401 }
    );

  if (isAfter(new Date(), new Date(code.expireAt))) {
    return NextResponse.json({ message: "Expired code!" }, { status: 401 });
  }

  const [album] = await db
    .select({
      id: albumsTable.id,
      title: albumsTable.title,
      coverUrl: albumsTable.coverUrl,
      endDate: albumsTable.endDate,
      userLimit: albumsTable.userLimit,
      users: count(anonUsersTable.id),
    })
    .from(albumsTable)
    .leftJoin(anonUsersTable, eq(anonUsersTable.albumId, albumsTable.id))
    .where(eq(albumsTable.id, code.albumId))
    .groupBy(albumsTable.id)
    .limit(1);

  return NextResponse.json(album);
}
