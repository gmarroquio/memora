import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { albumsTable, mediasTable, usersTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const body = await req.json();

  const [user] = await db
    .select({
      albumLimit: usersTable.albumLimit,
      totalAlbum: count(albumsTable.id),
    })
    .from(usersTable)
    .leftJoin(albumsTable, eq(usersTable.id, albumsTable.userId))
    .where(eq(usersTable.id, userId));

  if (!user)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  if (user.albumLimit <= user.totalAlbum)
    return NextResponse.json(
      { message: "User cannot create more albums!" },
      { status: 403 }
    );

  const [album] = await db
    .insert(albumsTable)
    .values({ ...body, userId })
    .returning();

  return NextResponse.json(album);
};

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const album = await db
    .select({
      id: albumsTable.id,
      title: albumsTable.title,
      coverUrl: albumsTable.coverUrl,
      mediaCount: count(mediasTable.id),
    })
    .from(albumsTable)
    .leftJoin(mediasTable, eq(albumsTable.id, mediasTable.albumId))
    .groupBy(albumsTable.id)
    .where(eq(albumsTable.userId, userId));

  return NextResponse.json(album);
};
