import { db } from "@/db";
import { albumsTable, anonUsersTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { eq, count } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.albumId)
      return NextResponse.json(
        { message: "Name and id required" },
        { status: 400 }
      );

    const [album] = await db
      .select({
        userLimit: albumsTable.userLimit,
        count: count(anonUsersTable.id),
      })
      .from(albumsTable)
      .leftJoin(anonUsersTable, eq(albumsTable.id, anonUsersTable.albumId))
      .where(eq(albumsTable.id, body.albumId))
      .limit(1)
      .groupBy(albumsTable.id);

    if (album.count >= album.userLimit) {
      return NextResponse.json(
        { message: "Album atingiu o limite de usuários" },
        { status: 402 }
      );
    }

    const id = createId();

    const [user] = await db
      .insert(anonUsersTable)
      .values({ id: id, name: body.name, albumId: body.albumId })
      .returning();

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { message: "Error creating anon user" },
      { status: 500 }
    );
  }
}
