import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/register';

  const token = request.cookies.get('user_id')?.value || '';

  // Redirect authenticated users away from public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redirect unauthenticated users to the login page for protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/((?!api|_next|static|public).*)', // Match all pages except API routes, Next.js internals, and static files
  ],
};
