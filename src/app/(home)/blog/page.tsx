import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { blogPostTable } from "@/db/schema";
import { desc } from "drizzle-orm";

const getCachedPosts = unstable_cache(
  async () => {
    return db
      .select({
        id: blogPostTable.id,
        title: blogPostTable.title,
        cover: blogPostTable.cover,
        description: blogPostTable.description,
      })
      .from(blogPostTable)
      .orderBy(desc(blogPostTable.postDate));
  },
  ["blog"],
  { revalidate: 3600, tags: ["blog"] }
);

export default async function Page() {
  const data = await getCachedPosts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Recent Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="block">
            <div className="border rounded-lg overflow-hidden shadow-md">
              <Image
                src={post.cover ?? "/placeholder.svg"}
                alt={post.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
