import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = ["/es", "/en"].every(
    (locale) => !pathname.startsWith(locale) && pathname !== locale
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = "es";

    // e.g. incoming request is /products
    // The new URL is now /es/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
