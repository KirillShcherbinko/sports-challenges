import { describe, expect, it } from 'vitest';
import { AUTH_ROUTES } from '@/shared/config/auth-routes';
import { GUEST_ROUTES } from '@/shared/config/guest-routes';
import { ERoutes } from '@/shared';

describe('AUTH_ROUTES', () => {
  it('includes all expected auth routes', () => {
    expect(AUTH_ROUTES).toContain(ERoutes.PROFILE);
    expect(AUTH_ROUTES).toContain(ERoutes.PROFILE_EDIT);
    expect(AUTH_ROUTES).toContain(ERoutes.MY_CHALLENGES);
    expect(AUTH_ROUTES).toContain(ERoutes.CREATE_CHALLENGE);
    expect(AUTH_ROUTES).toContain(ERoutes.CHALLENGES_PROGRESS);
  });

  it('does not include guest routes', () => {
    expect(AUTH_ROUTES).not.toContain(ERoutes.SIGN_IN);
    expect(AUTH_ROUTES).not.toContain(ERoutes.SIGN_UP);
  });

  it('does not include public routes', () => {
    expect(AUTH_ROUTES).not.toContain(ERoutes.HOME);
    expect(AUTH_ROUTES).not.toContain(ERoutes.CHALLENGES);
    expect(AUTH_ROUTES).not.toContain(ERoutes.CREATORS);
  });
});

describe('GUEST_ROUTES', () => {
  it('includes sign-in and sign-up', () => {
    expect(GUEST_ROUTES).toContain(ERoutes.SIGN_IN);
    expect(GUEST_ROUTES).toContain(ERoutes.SIGN_UP);
  });

  it('does not include auth routes', () => {
    expect(GUEST_ROUTES).not.toContain(ERoutes.PROFILE);
    expect(GUEST_ROUTES).not.toContain(ERoutes.MY_CHALLENGES);
  });

  it('does not include public routes', () => {
    expect(GUEST_ROUTES).not.toContain(ERoutes.HOME);
    expect(GUEST_ROUTES).not.toContain(ERoutes.CHALLENGES);
    expect(GUEST_ROUTES).not.toContain(ERoutes.CREATORS);
  });
});

describe('route config overlap', () => {
  it('AUTH_ROUTES and GUEST_ROUTES have no overlap', () => {
    for (const route of AUTH_ROUTES) {
      expect(GUEST_ROUTES).not.toContain(route);
    }
  });
});
