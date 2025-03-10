import { db } from "@/db";
import { mediasTable } from "@/db/schema";
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

  const deletedMedia = await db
    .delete(mediasTable)
    .where(and(eq(mediasTable.uploader, userId), eq(mediasTable.id, body.id)))
    .returning();

  await fetch("https://api.uploadthing.com/v6/deleteFiles", {
    method: "POST",
    headers: {
      "x-uploadthing-api-key": process.env.UPLOADTHING_API_KEY!,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      fileKeys: deletedMedia.map((m) => m.utId),
    }),
  });

  return NextResponse.json({ message: "Photo deleted" });
}
