import express from "express";
import next from "next";

const port = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";

const fallbackPosts = [
  { id: 1, title: "Custom server basics", author: "Express" },
  { id: 2, title: "Next.js pages via handle()", author: "Next.js" },
  { id: 3, title: "Same port, different handlers", author: "PDP demo" },
];

async function fetchJsonPlaceholderPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`JSONPlaceholder failed with ${response.status}`);
  }

  const posts = await response.json();
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    author: `user-${post.userId}`,
  }));
}

const app = next({ dev });
const handle = app.getRequestHandler();

await app.prepare();

const server = express();

server.get("/express-api/status", (_req, res) => {
  res.json({
    status: "ok",
    handledBy: "Express",
    deployTarget: process.env.DEPLOY_TARGET ?? "ssr",
    timestamp: new Date().toISOString(),
  });
});

server.get("/express-api/posts", async (_req, res) => {
  try {
    const posts = await fetchJsonPlaceholderPosts();
    res.json({
      handledBy: "Express",
      source: "jsonplaceholder.typicode.com",
      posts,
    });
  } catch {
    res.json({
      handledBy: "Express",
      source: "fallback mock data (network error)",
      posts: fallbackPosts,
    });
  }
});

server.use((req, res) => handle(req, res));

server.listen(port, () => {
  console.log(`> Custom server (Express + Next.js) ready on http://localhost:${port}`);
});
