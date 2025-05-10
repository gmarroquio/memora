import { db } from "@/db";
import { albumsTable, subscriptionsTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
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

  await db.update(albumsTable).set({}).where(eq(albumsTable.id, body.albumId));

  await db.insert(subscriptionsTable).values({
    userId: user.id,
    name: body.name,
    priceId: body.priceId,
  });

  return NextResponse.json({ message: "Done" });
}

export async function GET(req: NextRequest) {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unouthorized" }, { status: 401 });

  const subscriptions = await db
    .select()
    .from(subscriptionsTable)
    .where(eq(subscriptionsTable.userId, userId))
    .orderBy(desc(subscriptionsTable.buyDate));

  return NextResponse.json(subscriptions);
}
