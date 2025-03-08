import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
  const origin = (await headers()).get("origin");
  const userId = req.headers.get("userId");
  if (!userId)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user)
    return NextResponse.json({ message: "User unauthorized" }, { status: 401 });

  let stripeCustomerId: string | null = user.stripeId;

  const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY!);

  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id, // DO NOT FORGET THIS
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
    return_url: `${origin ?? "https://memora.party"}/dashboard`,
    mode: "payment",
    line_items: [{ price: process.env.PRODUCT_TIER_1, quantity: 1 }],
    ui_mode: "embedded",
  });

  return NextResponse.json(checkout);
}
