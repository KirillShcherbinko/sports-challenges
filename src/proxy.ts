import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ERoutes } from '@/shared';
import { createServer } from '@/shared/lib/supabase/server';
import { isAuthRoute } from './app/lib/is-auth-route';
import { isGuestRoute } from './app/lib/is-guest-route';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isAuthorized = Boolean(user);

  if (!isAuthorized && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(ERoutes.SIGN_IN, request.url));
  }

  if (isAuthorized && isGuestRoute(pathname)) {
    return NextResponse.redirect(new URL(ERoutes.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};
