import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dev = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";
  const signature = request.headers.get("stripe-signature");
  if (!signature)
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let event;
  try {
    const buf = await request.text();
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_KEY!
    );
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const { data } = event;

    fetch(
      `${
        dev ? "http://localhost:3000" : "https://memora.party"
      }/api/user/subscription`,
      {
        method: "POST",
        headers: { id: "123DeOliveira4" },
        body: JSON.stringify({
          userId: data.object.customer,
          status: data.object.payment_status,
          priceId: data.object.metadata?.id,
          photoLimit: data.object.metadata?.photoLimit,
          time: data.object.metadata?.time,
        }),
      }
    );
  }

  return NextResponse.json({ ok: true });
}
