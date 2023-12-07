import Link from "next/link";
import { fetch_posts } from "@/../db/api/post";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default async function Feed() {
  const posts = await getData();
  // console.log(posts);

  return (
    <div className="flex flex-col space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.content}</p>
          <Link href={`/post/${post.id}`}>
            <div className="text-blue-500 hover:underline mt-2 inline-block">
              Read more
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getData() {
  const posts = await fetch_posts();

  // const posts = await res.json();

  return posts;
}
