export const runtime = "edge";

export async function GET() {
  return Response.json({
    runtime: "edge",
    time: new Date().toISOString(),
  });
}
