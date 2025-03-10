import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import {
  albumsTable,
  anonUsersTable,
  mediasTable,
  previewsTable,
  usersTable,
} from "@/db/schema";
import { and, eq, count } from "drizzle-orm";

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

  const medias = await db
    .select()
    .from(mediasTable)
    .where(and(eq(mediasTable.albumId, album.id)));

  return NextResponse.json({ ...album, medias });
};

export const POST = async (
  req: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
) => {
  const { id: albumId } = await _params;
  const body: {
    url: string;
    comment?: string;
    utId: string;
    uploader: string;
    previewUrl: string;
    previewKey: string;
  } = await req.json();

  const [album] = await db
    .select({
      id: albumsTable.id,
      userId: albumsTable.userId,
      limit: usersTable.photoLimit,
    })
    .from(albumsTable)
    .leftJoin(usersTable, eq(usersTable.id, albumsTable.userId))
    .where(eq(albumsTable.id, albumId));

  if (!album) {
    return NextResponse.redirect(
      "https://memora.party/add-photo?toast=Album%20not%20found"
    );
  }

  const [newMedia] = await db
    .insert(mediasTable)
    .values({
      albumId,
      ownerId: album.userId,
      url: body.url,
      comment: body.comment,
      utId: body.utId,
      uploader: body.uploader,
    })
    .returning();

  await db
    .insert(previewsTable)
    .values({
      mediaId: newMedia.id,
      utId: body.previewKey,
      url: body.previewUrl,
    })
    .returning();

  const medias = await db
    .select({
      id: mediasTable.id,
      url: mediasTable.url,
      comment: mediasTable.comment,
      preview: previewsTable.url,
      uploaderId: anonUsersTable.id,
      uploaderName: anonUsersTable.name,
    })
    .from(mediasTable)
    .leftJoin(previewsTable, eq(mediasTable.id, previewsTable.mediaId))
    .leftJoin(anonUsersTable, eq(mediasTable.uploader, anonUsersTable.id))
    .where(eq(mediasTable.albumId, albumId));

  const [userMedias] = await db
    .select({ count: count() })
    .from(mediasTable)
    .where(eq(mediasTable.ownerId, album.userId));

  return NextResponse.json({ medias, count: userMedias.count });
};
