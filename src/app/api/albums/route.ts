import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { albumsTable, mediasTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const [album] = await db.insert(albumsTable).values(body).returning();

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
    .where(eq(albumsTable.userId, Number(userId)));

  return NextResponse.json(album);
};
