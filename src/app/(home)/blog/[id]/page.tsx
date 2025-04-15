import { baseUrl } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData(id: string) {
  const host = (await headers()).get("host");

  const response = await fetch(baseUrl({ host, path: `/api/blog/${id}` }));
  if (response.ok)
    return response.json() as Promise<{
      title: string;
      description: string;
      keywords: string;
      text: string;
      images: { id: string; url: string }[];
    }>;
  else {
    redirect(baseUrl({ host, path: `/blog/` }));
  }
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
