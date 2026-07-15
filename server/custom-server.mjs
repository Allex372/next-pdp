import express from "express";
import next from "next";

const port = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";

const mockPosts = [
  { id: 1, title: "Custom server basics", author: "Express" },
  { id: 2, title: "Next.js pages via handle()", author: "Next.js" },
  { id: 3, title: "Same port, different handlers", author: "PDP demo" },
];

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

server.get("/express-api/posts", (_req, res) => {
  res.json({
    handledBy: "Express",
    source: "in-memory mock data",
    posts: mockPosts,
  });
});

server.use((req, res) => handle(req, res));

server.listen(port, () => {
  console.log(
    `> Custom server (Express + Next.js) ready on http://localhost:${port}`
  );
});
