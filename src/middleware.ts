import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    // const isClient = true

    // if (!isClient && request.nextUrl.pathname == '/') {
    //     const url = new URL('/dashboard', request.url)
    //     return NextResponse.rewrite(url)
    // }

    // No redirect
    return NextResponse.next()
}