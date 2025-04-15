import { db } from "@/db";
import { blogImagesTable, blogPostTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params: _params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await _params;

  const post = await db
    .select({
      id: blogPostTable.id,
      title: blogPostTable.title,
      cover: blogPostTable.cover,
      description: blogPostTable.description,
      text: blogPostTable.text,
      image: {
        id: blogImagesTable.id,
        ulr: blogImagesTable.url,
      },
    })
    .from(blogPostTable)
    .leftJoin(blogImagesTable, eq(blogImagesTable.postId, blogPostTable.id))
    .where(eq(blogPostTable.id, id));

  const clean: {
    title: string;
    cover: string;
    description: string;
    text: string;
    images: {
      id: string;
      ulr: string;
    }[];
  } = {
    title: post[0].title,
    cover: post[0].cover,
    description: post[0].description,
    text: post[0].text,
    images: [],
  };

  post.forEach((p) => {
    if (p.image) clean.images.push(p.image);
  });

  return NextResponse.json(clean);
};
