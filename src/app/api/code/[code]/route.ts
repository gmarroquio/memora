import { db } from "@/db";
import { codesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { isAfter } from "date-fns";

export async function GET(
  _req: NextRequest,
  { params: _params }: { params: Promise<{ code: string }> }
) {
  const { code: incomeCode } = await _params;

  const [code] = await db
    .select()
    .from(codesTable)
    .limit(1)
    .where(eq(codesTable.code, incomeCode));

  if (isAfter(new Date(), new Date(code.expireAt))) {
    return NextResponse.json({ message: "Invalid code" }, { status: 401 });
  }

  return NextResponse.json({ code });
}
