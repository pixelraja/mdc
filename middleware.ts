import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  )
    return NextResponse.next();
  if (pathname.startsWith("/api/") && !req.cookies.get("auth"))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!req.cookies.get("auth"))
    return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
