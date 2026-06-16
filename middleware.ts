import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEMO_USER_COOKIE } from "@/lib/demo/users";

const PUBLIC_PATHS = new Set(["/", "/login", "/signup", "/icon", "/apple-icon"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  if (!request.cookies.get(DEMO_USER_COOKIE)?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|apple-icon).*)"],
};
