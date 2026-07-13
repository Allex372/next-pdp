import type { NextConfig } from "next";

const deployTarget = process.env.DEPLOY_TARGET ?? "ssr";

const nextConfig: NextConfig = {
  ...(deployTarget === "static" ? { output: "export" } : {}),
};

export default nextConfig;
