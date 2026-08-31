import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/demos/i18n") {
    return NextResponse.next();
  }

  const lang = request.headers.get("accept-language") ?? "";
  const locale = lang.toLowerCase().startsWith("en") ? "en" : "uk";

  return NextResponse.redirect(new URL(`/demos/i18n/${locale}`, request.url));
}

export const config = {
  matcher: "/demos/i18n",
};
