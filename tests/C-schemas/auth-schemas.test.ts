import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { signInSchema, signUpSchema } from '@/entities/auth/model/shemas';

const validPasswordArbitrary = fc
  .string({ minLength: 8, maxLength: 32 })
  .filter((s) => /[0-9]/.test(s) && /[A-Z]/.test(s));

const zodEmailRegex =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const emailArbitrary = fc.emailAddress().filter((e) => zodEmailRegex.test(e));

const usernameArbitrary = fc
  .string({ minLength: 2, maxLength: 32 })
  .filter((s) => s.trim().length >= 2);

describe('signInSchema', () => {
  it('accepts valid email and password', () => {
    fc.assert(
      fc.property(
        emailArbitrary,
        fc.string({ minLength: 1 }),
        (email, password) => {
          const result = signInSchema.parse({ email, password });
          expect(result.email).toBe(email);
          expect(result.password).toBe(password);
        },
      ),
    );
  });

  it('rejects missing email', () => {
    expect(() => signInSchema.parse({ password: 'abc' })).toThrow();
  });

  it('rejects empty password', () => {
    expect(() =>
      signInSchema.parse({ email: 'test@test.com', password: '' }),
    ).toThrow();
  });
});

describe('signUpSchema', () => {
  it('accepts valid username, email and password', () => {
    fc.assert(
      fc.property(
        usernameArbitrary,
        emailArbitrary,
        validPasswordArbitrary,
        (username, email, password) => {
          const result = signUpSchema.parse({ username, email, password });
          expect(result.username).toBe(username);
          expect(result.email).toBe(email);
          expect(result.password).toBe(password);
        },
      ),
    );
  });

  it('rejects passwords shorter than 8 characters', () => {
    fc.assert(
      fc.property(
        usernameArbitrary,
        emailArbitrary,
        fc
          .string({ minLength: 1, maxLength: 7 })
          .filter((s) => /[0-9]/.test(s) && /[A-Z]/.test(s)),
        (username, email, password) => {
          expect(() =>
            signUpSchema.parse({ username, email, password }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects passwords longer than 32 characters', () => {
    fc.assert(
      fc.property(
        usernameArbitrary,
        emailArbitrary,
        fc
          .string({ minLength: 33, maxLength: 50 })
          .filter((s) => /[0-9]/.test(s) && /[A-Z]/.test(s)),
        (username, email, password) => {
          expect(() =>
            signUpSchema.parse({ username, email, password }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects passwords without a digit', () => {
    fc.assert(
      fc.property(
        usernameArbitrary,
        emailArbitrary,
        fc
          .string({ minLength: 8, maxLength: 32 })
          .filter((s) => /[A-Za-z]/.test(s) && /[A-Z]/.test(s) && !/[0-9]/.test(s)),
        (username, email, password) => {
          expect(() =>
            signUpSchema.parse({ username, email, password }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects passwords without an uppercase letter', () => {
    fc.assert(
      fc.property(
        usernameArbitrary,
        emailArbitrary,
        fc
          .string({ minLength: 8, maxLength: 32 })
          .filter((s) => /[0-9]/.test(s) && /[a-z]/.test(s) && !/[A-Z]/.test(s)),
        (username, email, password) => {
          expect(() =>
            signUpSchema.parse({ username, email, password }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects missing required fields', () => {
    expect(() => signUpSchema.parse({})).toThrow();
    expect(() =>
      signUpSchema.parse({ username: 'test', email: 'test@test.com' }),
    ).toThrow();
  });

  it('rejects invalid email', () => {
    expect(() =>
      signUpSchema.parse({
        username: 'testuser',
        email: 'not-an-email',
        password: 'ValidPass1',
      }),
    ).toThrow();
  });
});
