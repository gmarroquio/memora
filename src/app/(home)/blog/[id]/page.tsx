import { baseUrl } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

async function getData(id: string) {
  const response = await fetch(baseUrl(`/api/blog/${id}`), {
    next: { tags: ["blog"] },
  });
  if (response.ok)
    return response.json() as Promise<{
      title: string;
      description: string;
      keywords: string;
      text: string;
      images: { id: string; url: string }[];
    }>;
  else {
    redirect(baseUrl(`/blog/`));
  }
}

export async function generateStaticParams() {
  const posts = await fetch(baseUrl("/api/blog")).then(
    (res) =>
      res.json() as Promise<
        { id: string; cover: string; title: string; description: string }[]
      >
  );
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
