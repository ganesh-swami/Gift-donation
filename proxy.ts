import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Basic auth for /admin only. Set ADMIN_PASSWORD; if unset, /admin is closed.
export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD
  const header = request.headers.get("authorization")
  if (password && header?.startsWith("Basic ")) {
    const [, pass] = atob(header.slice(6)).split(":")
    if (pass === password) return NextResponse.next()
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="admin"' },
  })
}

export const config = { matcher: "/admin/:path*" }
