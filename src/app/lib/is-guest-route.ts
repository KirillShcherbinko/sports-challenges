import { GUEST_ROUTES } from '@/shared/config/guest-routes';

export const isGuestRoute = (pathname: string): boolean => {
  return GUEST_ROUTES.some((route) => pathname.startsWith(route));
};
