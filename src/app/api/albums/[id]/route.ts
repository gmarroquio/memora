import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { albumsTable, mediasTable } from "@/db/schema";
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
  const body = await req.json();

  const [album] = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.id, albumId));

  if (!album) {
    return NextResponse.redirect(
      "https://localhost:3000/add-photo?toast=Album%20not%20found"
    );
  }

  await db
    .insert(mediasTable)
    .values({ albumId, userId: album.userId, url: body.url });

  return NextResponse.json({ done: true });
};
