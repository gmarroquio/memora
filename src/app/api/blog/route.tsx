import { db } from "@/db";
import { blogImagesTable, blogPostTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const posts = await db
    .select({
      id: blogPostTable.id,
      title: blogPostTable.title,
      cover: blogPostTable.cover,
      description: blogPostTable.description,
    })
    .from(blogPostTable)
    .orderBy(desc(blogPostTable.postDate));

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("token");
  if (!token || token != "1234DeOliveira5") {
    return NextResponse.json({ message: "Wrong" }, { status: 400 });
  }

  const {
    text,
    title,
    description,
    keywords,
    cover,
    images,
  }: {
    text: string;
    title: string;
    keywords: string;
    description: string;
    cover: string;
    images: { id: string; url: string }[];
  } = await req.json();

  const [post] = await db
    .insert(blogPostTable)
    .values({ text, title, description, cover, keywords })
    .returning();

  await db
    .insert(blogImagesTable)
    .values(images.map((i) => ({ id: i.id, url: i.url, postId: post.id })));

  return NextResponse.json({ message: "done" });
}
