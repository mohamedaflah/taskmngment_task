import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { TextEncoder } from "util";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("taskmanagementauthtoken");
  const url = req.nextUrl.clone();

  try {
    if (token) {
      // const { payload } = await jwtVerify(token as unknown as string | Uint8Array, secret);

      // Ensure the payload contains the required data
      // if (!payload || !(payload as any).id) {
      //   url.pathname = "/login";
      //   return NextResponse.redirect(url);
      // }

      // Redirect authenticated users away from login and signup pages
      if (url.pathname === "/login" || url.pathname === "/signup") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } else {
      // Redirect unauthenticated users trying to access the root route
      if (url.pathname === "/") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }
  } catch (error) {
    console.error("JWT verification failed:", error);

    // If token verification fails, redirect to login
    if (url.pathname === "/") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
