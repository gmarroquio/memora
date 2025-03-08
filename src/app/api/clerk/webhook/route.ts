import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { z } from "zod";

const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET || "your-secret";

const HttpRequestSchema = z.object({
  client_ip: z.string(),
  user_agent: z.string(),
});

const EventAttributesSchema = z.object({
  http_request: HttpRequestSchema,
});

const DataSchema = z.object({
  deleted: z.boolean(),
  id: z.string(),
  object: z.string(),
});

//eslint-disable-next-line
const EventSchema = z.object({
  data: DataSchema,
  event_attributes: EventAttributesSchema,
  object: z.string(),
  timestamp: z.number(),
  type: z.string(),
});

export async function POST(req: NextRequest) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.json();

  const sivx = new Webhook(webhookSecret);

  //eslint-disable-next-line
  let msg: any;

  try {
    msg = sivx.verify(JSON.stringify(body), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }

  if (msg.type === "user.deleted") {
    await db.delete(usersTable).where(eq(usersTable.id, msg.data.id));
  } else if (msg.type === "user.created") {
    await db.insert(usersTable).values({
      id: msg.data.id,
      name: msg.data.first_name + " " + (msg.data.last_name ?? ""),
      email: msg.data.email_addresses[0].email_address,
    });
  }

  return new NextResponse("OK", { status: 200 });
}
