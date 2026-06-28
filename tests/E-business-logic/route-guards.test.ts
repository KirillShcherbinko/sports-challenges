import { describe, expect, it } from 'vitest';
import { isAuthRoute } from '@/app/lib/is-auth-route';
import { isGuestRoute } from '@/app/lib/is-guest-route';
import { ERoutes } from '@/shared';

describe('isAuthRoute', () => {
  it('returns true for known auth routes', () => {
    expect(isAuthRoute(ERoutes.PROFILE)).toBe(true);
    expect(isAuthRoute(ERoutes.PROFILE_EDIT)).toBe(true);
    expect(isAuthRoute(ERoutes.MY_CHALLENGES)).toBe(true);
    expect(isAuthRoute(ERoutes.CREATE_CHALLENGE)).toBe(true);
    expect(isAuthRoute(ERoutes.ACHIEVEMENTS)).toBe(true);
    expect(isAuthRoute(ERoutes.CHALLENGES_PROGRESS)).toBe(true);
  });

  it('returns true for nested paths under auth routes', () => {
    expect(isAuthRoute(`${ERoutes.MY_CHALLENGES}/123`)).toBe(true);
    expect(isAuthRoute(`${ERoutes.CHALLENGES_PROGRESS}/456`)).toBe(true);
  });

  it('returns false for guest routes', () => {
    expect(isAuthRoute(ERoutes.SIGN_IN)).toBe(false);
    expect(isAuthRoute(ERoutes.SIGN_UP)).toBe(false);
  });

  it('returns false for public routes', () => {
    expect(isAuthRoute(ERoutes.HOME)).toBe(false);
    expect(isAuthRoute(ERoutes.CHALLENGES)).toBe(false);
    expect(isAuthRoute(ERoutes.CREATORS)).toBe(false);
  });
});

describe('isGuestRoute', () => {
  it('returns true for sign-in and sign-up', () => {
    expect(isGuestRoute(ERoutes.SIGN_IN)).toBe(true);
    expect(isGuestRoute(ERoutes.SIGN_UP)).toBe(true);
  });

  it('returns false for auth routes', () => {
    expect(isGuestRoute(ERoutes.PROFILE)).toBe(false);
    expect(isGuestRoute(ERoutes.MY_CHALLENGES)).toBe(false);
  });

  it('returns false for public routes', () => {
    expect(isGuestRoute(ERoutes.HOME)).toBe(false);
    expect(isGuestRoute(ERoutes.CHALLENGES)).toBe(false);
    expect(isGuestRoute(ERoutes.CREATORS)).toBe(false);
  });
});
