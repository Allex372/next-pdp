import type { NextConfig } from "next";

const deployTarget = process.env.DEPLOY_TARGET ?? "ssr";
const isStatic = deployTarget === "static";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" } : {}),
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
