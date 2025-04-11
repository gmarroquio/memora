import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const products = {
  tier_1: {
    id: process.env.PRODUCT_TIER_1!,
    photo_limit: 500,
    time: 6,
    name: "Basic",
  },
  tier_2: {
    id: process.env.PRODUCT_TIER_2!,
    photo_limit: 1500,
    time: 12,
    name: "Premium",
  },
};

export async function GET(req: Request) {
  const dev = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";
  const userId = req.headers.get("userId");
  const price = req.headers.get("price") as "tier_1" | "tier_2";
  if (!userId || !price)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

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

  const checkout = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    return_url: `${
      dev ? "http://localhost:3000" : "https://memora.party"
    }/dashboard/`,
    mode: "payment",
    discounts: [{ coupon: "promo_1RCVIlE4vJuSIv12qmoP9nOk" }],
    line_items: [{ price: products[price].id, quantity: 1 }],
    ui_mode: "embedded",
    metadata: products[price],
  });

  return NextResponse.json(checkout);
}
