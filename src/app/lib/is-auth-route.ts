import { AUTH_ROUTES } from '../config/auth-routes';

export const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
};
