import { GUEST_ROUTES } from '../config/guest-routes';

export const isGuestRoute = (pathname: string): boolean => {
  return GUEST_ROUTES.some((route) => pathname.startsWith(route));
};
