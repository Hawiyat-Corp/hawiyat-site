import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard", "/billing", "/settings"];
  const { pathname } = req.nextUrl;

  if (protectedPaths.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/waitlist";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/billing", "/settings"],
};
