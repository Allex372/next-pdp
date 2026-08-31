import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    runtime: "nodejs",
    time: new Date().toISOString(),
  });
}
