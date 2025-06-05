import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
 // Pehle session update karo (agar ye zaroori hai)
  const response = await updateSession(request)

  //  const { pathname } = request.nextUrl

  // // Supabase token from cookies
  // const token = request.cookies.get('sb-access-token')?.value

  // // Public pages — inko login ke bina bhi dikhana allowed hai
  // const publicPaths = ['/login', '/signup', '/check-email', '/api', '/auth/confirm', 'confirm-landing']

  // // ✅ If it's a public path
  // if (publicPaths.some(path => pathname.startsWith(path))) {
  //   if (token && (pathname === '/login' || pathname === '/signup')) {
  //     // Logged in user shouldn't visit login/signup page
  //     return NextResponse.redirect(new URL('/', request.url))
  //   }
  //   return response
  // }

  // // ✅ If it's a protected path (e.g., /), and user is not logged in
  // if (!token) {
  //   console.log("token is not available");
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // ✅ Everything OK
  return response

}

export const config = {
  matcher: [
   
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}