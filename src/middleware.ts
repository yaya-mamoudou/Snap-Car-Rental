import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const user = request.cookies.get('user')
    if (!user?.value) return NextResponse.redirect(new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url))
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/dashboard/:path*', '/cars/:path*/confirm'],
}