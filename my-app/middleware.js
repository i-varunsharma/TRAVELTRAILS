import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Protected routes that require authentication
  const protectedRoutes = ['/places', '/contact', '/about'];
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Check for authentication cookie
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
    
    if (!isLoggedIn) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/places/:path*', '/contact/:path*', '/about/:path*']
};