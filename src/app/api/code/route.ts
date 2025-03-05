import { db } from "@/db";
import { codesTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { addDays } from "date-fns";

export async function POST(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });
  const body = await req.json();
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const expires = addDays(new Date(), body.expirationDays);

  await db
    .insert(codesTable)
    .values({ code, expireAt: expires.toISOString(), albumId: body.albumId });

  return NextResponse.json({ code });
}
