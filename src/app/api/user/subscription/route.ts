import { db } from "@/db";
import { albumsTable, subscriptionsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = req.headers.get("id");
  if (id !== "123DeOliveira4")
    return NextResponse.json({ error: true }, { status: 401 });

  const body = await req.json();

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.stripeId, body.userId));

  await db.insert(subscriptionsTable).values({
    userId: user.id,
    priceId: body.priceId,
    photoLimit: body.photoLimit,
    expirationTime: body.time,
  });

  await db
    .update(albumsTable)
    .set({
      photoLimit: body.photoLimit,
    })
    .where(eq(albumsTable.userId, user.id));

  return NextResponse.json({ message: "Done" });
}
