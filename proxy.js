import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

// Proxy to protect routes

export default async function proxy(request) {
    const token = request.cookies.get('session')?.value;

    const {pathname} = request.nextUrl;
    
    if(!token) {
        console.log('hola');
        
        if(pathname.startsWith('/app')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.next();
    }

    try {
        const validateToken = await fetch(`${API_URL}/verify-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (validateToken.ok) {
            if (pathname.startsWith('/login')) {
                return NextResponse.redirect(new URL('/app', request.url));
            }

            if (pathname.startsWith('/register')) {
                return NextResponse.redirect(new URL('/app', request.url)); 
            }
            return NextResponse.next();
        }

        throw new Error('Invalid token');
    } catch(error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
  matcher: ['/app/:path*', '/login', '/register'], // Rutas a proteger
};