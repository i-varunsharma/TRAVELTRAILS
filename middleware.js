import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/server/jwt';

// Routes that require a logged-in session
const protectedRoutes = ['/places', '/contact', '/about', '/admin'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/places/:path*', '/contact/:path*', '/about/:path*', '/admin/:path*']
};