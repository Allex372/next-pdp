"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  author: string;
};

type PostsResponse = {
  handledBy: string;
  source: string;
  posts: Post[];
};

export function ExpressPostsDemo() {
  const [data, setData] = useState<PostsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/express-api/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((json: PostsResponse) => {
        setData(json);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-zinc-500">Завантаження з Express API…</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        Помилка: {error}. Запустіть{" "}
        <code className="rounded bg-zinc-200 px-1 py-0.5 font-mono dark:bg-zinc-800">
          npm run dev:custom
        </code>
        , бо звичайний{" "}
        <code className="rounded bg-zinc-200 px-1 py-0.5 font-mono dark:bg-zinc-800">
          next dev
        </code>{" "}
        не знає про Express-роути.
      </p>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-500">
        Джерело: <span className="font-mono">{data.source}</span> · обробник:{" "}
        <span className="font-mono">{data.handledBy}</span>
      </p>
      <ul className="space-y-2">
        {data.posts.map((post) => (
          <li
            key={post.id}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {post.title}
            </p>
            <p className="text-xs text-zinc-500">автор: {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
