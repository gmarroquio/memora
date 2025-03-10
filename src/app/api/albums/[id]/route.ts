import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { albumsTable, anonUsersTable, mediasTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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
  } = await req.json();

  const [album] = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.id, albumId));

  if (!album) {
    return NextResponse.redirect(
      "https://memora.party/add-photo?toast=Album%20not%20found"
    );
  }

  await db.insert(mediasTable).values({
    albumId,
    ownerId: album.userId,
    ...body,
  });

  const medias = await db
    .select({
      id: mediasTable.id,
      url: mediasTable.url,
      comment: mediasTable.comment,
      uploaderId: anonUsersTable.id,
      uploaderName: anonUsersTable.name,
    })
    .from(mediasTable)
    .leftJoin(anonUsersTable, eq(mediasTable.uploader, anonUsersTable.id));

  return NextResponse.json(medias);
};
