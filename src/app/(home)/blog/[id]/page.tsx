import { MDXRemote } from "next-mdx-remote/rsc";
import { db } from "@/db";
import { blogImagesTable, blogPostTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const revalidate = 60;
export const dynamicParams = true;

async function getData(id: string) {
  const post = await db
    .select({
      id: blogPostTable.id,
      title: blogPostTable.title,
      cover: blogPostTable.cover,
      description: blogPostTable.description,
      keywords: blogPostTable.keywords,
      text: blogPostTable.text,
      image: {
        id: blogImagesTable.id,
        url: blogImagesTable.url,
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
    keywords: string;
    images: {
      id: string;
      url: string;
    }[];
  } = {
    title: post[0].title,
    cover: post[0].cover,
    description: post[0].description,
    text: post[0].text,
    keywords: post[0].keywords,
    images: [],
  };

  post.forEach((p) => {
    if (p.image) clean.images.push(p.image);
  });

  return clean;
}

export async function generateStaticParams() {
  const posts = await db
    .select({
      id: blogPostTable.id,
    })
    .from(blogPostTable)
    .orderBy(desc(blogPostTable.postDate));

  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({
  params: _params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await _params;
  const post = await getData(id);

  const text =
    post.text +
    "\n\n" +
    post.images.map((i) => `[${i.id}]:${i.url}`).join("\n");

  return (
    <article className="mx-auto prose prose-invert prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p className="sr-only">{post.keywords}</p>
      <MDXRemote source={text} />
    </article>
  );
}
