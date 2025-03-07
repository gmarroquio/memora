import { db } from "@/db";
import { mediasTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const medias = await db
    .select()
    .from(mediasTable)
    .where(eq(mediasTable.ownerId, userId));

  return NextResponse.json(medias);
};
