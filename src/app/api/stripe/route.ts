import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { baseUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
  const userId = req.headers.get("userId");
  const price = req.headers.get("price") as
    | "tier_1"
    | "tier_2"
    | "tier_3"
    | "tier_4"
    | "tier_5";
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

  const {
    data: [product_price],
  } = await stripe.prices.list({
    product: process.env.STRIPE_PRODUCT!,
    lookup_keys: [price],
  });

  const checkout = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    success_url: baseUrl("/dashboard"),
    mode: "payment",
    line_items: [{ price: product_price.id, quantity: 1 }],
    metadata: {
      userId,
    },
  });

  return NextResponse.json(checkout);
}
