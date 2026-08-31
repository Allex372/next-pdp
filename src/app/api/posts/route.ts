import { NextResponse } from "next/server";

type JsonPlaceholderPost = {
  userId: number;
  id: number;
  title: string;
};

export async function GET() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`JSONPlaceholder failed with ${response.status}`);
    }

    const posts: JsonPlaceholderPost[] = await response.json();

    return NextResponse.json({
      handledBy: "Next.js Route Handler",
      source: "jsonplaceholder.typicode.com",
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
        author: `user-${post.userId}`,
      })),
    });
  } catch {
    return NextResponse.json({
      handledBy: "Next.js Route Handler",
      source: "fallback mock data (network error)",
      posts: [
        { id: 1, title: "Fallback post #1", author: "next-api" },
        { id: 2, title: "Fallback post #2", author: "next-api" },
      ],
    });
  }
}
