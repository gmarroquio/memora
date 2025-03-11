import { db } from "@/db";
import {
  albumsTable,
  anonUsersTable,
  codesTable,
  mediasTable,
  previewsTable,
} from "@/db/schema";
import { and, count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { isAfter } from "date-fns";

export async function GET(
  req: NextRequest,
  { params: _params }: { params: Promise<{ code: string }> }
) {
  const page = Number(new URL(req.url).searchParams.get("page") ?? 1);
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
      limit: albumsTable.photoLimit,
      userId: albumsTable.userId,
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
    .where(eq(mediasTable.albumId, code.albumId))
    .orderBy(desc(mediasTable.id))
    .offset(21 * (page - 1))
    .limit(21);

  const [userMedias] = await db
    .select({ count: count() })
    .from(mediasTable)
    .where(
      and(
        eq(mediasTable.ownerId, album.userId),
        eq(mediasTable.albumId, album.id)
      )
    );

  return NextResponse.json({
    album: { ...album, count: userMedias.count },
    medias,
  });
}
