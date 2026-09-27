import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (body.username !== "demo" || body.password !== "demo123")
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set("auth", "demo-token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
