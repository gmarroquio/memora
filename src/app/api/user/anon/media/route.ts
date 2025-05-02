import { db } from "@/db";
import { mediasTable, previewsTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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

  const [preview] = await db
    .select()
    .from(previewsTable)
    .where(eq(previewsTable.utId, body.id));

  const [deletedMedia] = await db
    .delete(mediasTable)
    .where(
      and(eq(mediasTable.uploader, userId), eq(mediasTable.id, preview.mediaId))
    )
    .returning();

  const toDelete = [preview.utId, deletedMedia.utId];

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

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const page = Number(searchParams.get("page"));
  const all = Boolean(searchParams.get("all"));

  let previews;

  if (!all)
    previews = await db
      .select({
        url: previewsTable.url,
        key: previewsTable.utId,
      })
      .from(previewsTable)
      .leftJoin(mediasTable, eq(previewsTable.mediaId, mediasTable.id))
      .where(eq(mediasTable.uploader, userId))
      .limit(10)
      .offset((page - 1) * 10);
  else
    previews = await db
      .select({
        url: previewsTable.url,
        key: previewsTable.utId,
      })
      .from(previewsTable)
      .leftJoin(mediasTable, eq(previewsTable.mediaId, mediasTable.id))
      .limit(10)
      .offset((page - 1) * 10);

  return NextResponse.json(previews);
}
