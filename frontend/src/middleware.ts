import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicPaths = ["/login", "/signup"];

  if (publicPaths.some((path) => pathname.startsWith(path)))
    return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
  runtime: "nodejs", // forces Node runtime so jsonwebtoken works
};
