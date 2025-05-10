import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { albumsTable, mediasTable, usersTable } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";
import Stripe from "stripe";
import { baseUrl } from "@/lib/utils";

export const POST = async (req: NextRequest) => {
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const body = await req.json();

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  if (!user)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const [album] = await db
    .insert(albumsTable)
    .values({
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      userId,
    })
    .returning();

  let stripeCustomerId: string | null = user.stripeId;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });
    await db
      .update(usersTable)
      .set({ stripeId: newCustomer.id })
      .where(eq(usersTable.id, userId));

    stripeCustomerId = newCustomer.id;
  }

  const {
    data: [product_price],
  } = await stripe.prices.list({
    product: process.env.STRIPE_PRODUCT!,
    lookup_keys: [body.guests],
  });

  const checkout = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    success_url: baseUrl(`/dashboard/albums/${album.id}`),
    mode: "payment",
    line_items: [{ price: product_price.id, quantity: 1 }],
    metadata: {
      userId,
      albumId: album.id,
      tier: body.guests,
    },
  });

  return NextResponse.json({ url: checkout.url });
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
    .where(eq(albumsTable.userId, userId))
    .orderBy(desc(albumsTable.createdAt));

  return NextResponse.json(album);
};
