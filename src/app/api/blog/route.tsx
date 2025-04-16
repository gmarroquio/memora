import { db } from "@/db";
import { blogImagesTable, blogPostTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

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
  revalidateTag("blog");
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
    cover: string; // description
    images: { id: string; url: string }[]; // images: { id: string; description: string }[];
  } = await req.json();

  //TODO: Generate all images based on the descriptions
  // upload
  // save the url and id
  // add to database

  const [post] = await db
    .insert(blogPostTable)
    .values({ text, title, description, cover, keywords })
    .returning();

  await db
    .insert(blogImagesTable)
    .values(images.map((i) => ({ id: i.id, url: i.url, postId: post.id })));

  return NextResponse.json({ message: "done" });
}
