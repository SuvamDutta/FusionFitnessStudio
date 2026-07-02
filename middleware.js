import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('auth-token');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // If trying to access any page without logging in, redirect to /login
  if (!authToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If trying to access /login when already logged in, redirect to dashboard
  if (authToken && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes EXCEPT API, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|favicon.ico).*)'],
};
