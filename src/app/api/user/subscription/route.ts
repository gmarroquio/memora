import { db } from "@/db";
import { albumsTable, subscriptionsTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const tier = {
  tier_1: 10,
  tier_2: 25,
  tier_3: 50,
  tier_4: 100,
  tier_5: 150,
};

export async function POST(req: NextRequest) {
  const id = req.headers.get("id");
  if (id !== "123DeOliveira4")
    return NextResponse.json({ error: true }, { status: 401 });

  const body = (await req.json()) as {
    tier: "tier_1" | "tier_2" | "tier_3" | "tier_4" | "tier_5";
    userId: string;
    albumId: string;
  };

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, body.userId));

  await db
    .update(albumsTable)
    .set({
      userLimit: tier[body.tier],
    })
    .where(eq(albumsTable.id, body.albumId));

  await db.insert(subscriptionsTable).values({
    userId: user.id,
    priceId: body.tier,
    albumId: body.albumId,
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
