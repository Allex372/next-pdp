import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    deployTarget: process.env.DEPLOY_TARGET ?? "ssr",
    timestamp: new Date().toISOString(),
  });
}
