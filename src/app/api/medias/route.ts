import { db } from "@/db";
import { mediasTable, previewsTable } from "@/db/schema";
import { eq, and, desc, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get("userId");
  const page = Number(new URL(req.url).searchParams.get("page") ?? 1);
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const medias = await db
    .select({
      id: mediasTable.id,
      name: mediasTable.utId,
      url: mediasTable.url,
      comment: mediasTable.comment,
    })
    .from(mediasTable)
    .where(eq(mediasTable.ownerId, userId))
    .limit(10)
    .offset((page - 1) * 10)
    .orderBy(desc(mediasTable.id));

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(mediasTable)
    .where(eq(mediasTable.ownerId, userId));

  return NextResponse.json({ total, medias });
};

export async function DELETE(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.id)
    return NextResponse.json(
      { message: "Photo id is required" },
      { status: 400 }
    );

  const preview = await db
    .delete(previewsTable)
    .where(eq(previewsTable.mediaId, body.id))
    .returning();

  const deletedMedia = await db
    .delete(mediasTable)
    .where(and(eq(mediasTable.ownerId, userId), eq(mediasTable.id, body.id)))
    .returning();

  console.log(deletedMedia);
  console.log(preview);

  const toDelete = [
    ...preview.map((p) => p.utId),
    ...deletedMedia.map((m) => m.utId),
  ];

  await fetch("https://api.uploadthing.com/v6/deleteFiles", {
    method: "POST",
    headers: {
      "x-uploadthing-api-key": process.env.UPLOADTHING_API_KEY!,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      fileKeys: toDelete,
    }),
  });

  return NextResponse.json({ message: "Photo deleted" });
}
