import { db } from "@/db";
import {
  albumsTable,
  anonUsersTable,
  codesTable,
  mediasTable,
  previewsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { isAfter } from "date-fns";

export async function GET(
  _req: NextRequest,
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
    })
    .from(albumsTable)
    .limit(1)
    .where(eq(albumsTable.id, code.albumId));

  const medias = await db
    .select({
      id: mediasTable.id,
      url: mediasTable.url,
      preview: previewsTable.url,
      uploaderId: anonUsersTable.id,
      uploaderName: anonUsersTable.name,
      comment: mediasTable.comment,
    })
    .from(mediasTable)
    .leftJoin(anonUsersTable, eq(anonUsersTable.id, mediasTable.uploader))
    .leftJoin(previewsTable, eq(mediasTable.id, previewsTable.mediaId))
    .where(eq(mediasTable.albumId, code.albumId));

  return NextResponse.json({ album, medias });
}
