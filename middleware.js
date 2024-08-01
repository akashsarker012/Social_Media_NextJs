import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Define public paths and protected paths
  const isPublicPath = path === '/login' || path === '/register' || path === '/emailverification';
  const isProtectedPath = !isPublicPath;

  // Check for authentication token
  const token = request.cookies.get('user_id')?.value || '';

  // Redirect logged-in users from public paths to the home page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redirect unauthenticated users from protected paths to the login page
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Special case for email verification
  if (path === '/emailverification') {
    const email = url.searchParams.get('email');
    if (!email) {
      // Redirect to login if no email query parameter
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/emailverification',
    '/((?!api|_next|static|public).*)' // Apply to all other paths except API routes, static assets, and public folders
  ],
};
