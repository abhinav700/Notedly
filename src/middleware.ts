import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path==='/signup' ||  path == '/'
    const token = request.cookies.get('token')?.value||''
    if(isPublicPath && token != ''){
        const Url: any = new URL('/profile', request.nextUrl);
        return NextResponse.redirect(Url)
    }

    if(!isPublicPath && token === '' )
    {
        const Url: any = new URL('/', request.nextUrl);
        return NextResponse.redirect(Url)
    }
}

export const config = {
    matcher : [
        '/',
        '/profile/:path*',
        '/login',
        '/signup'  
    ]
}