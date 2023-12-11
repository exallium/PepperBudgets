import {NextRequest} from "next/server";
import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";

export function middleware(request: NextRequest) {
  return withAuth(request)
}

export const config = {
  matcher: ['/((?!api/auth|favicon.ico).*)']
}