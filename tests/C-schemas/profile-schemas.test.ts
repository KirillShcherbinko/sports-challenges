import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { usernameSchema, profileFiltersSchema, editProfileSchema } from '@/entities/profile/model/schemas';
import { FitnessCategory, FitnessLevel } from '@/shared/types';

const nonemptyString = (min: number, max: number) =>
  fc.string({ minLength: min, maxLength: max }).filter((s) => s.trim().length >= min);

const trimmedString = (min: number, max: number) =>
  fc
    .string({ minLength: min, maxLength: max })
    .filter((s) => s.trim().length >= min && s.trim().length <= max);

describe('usernameSchema', () => {
  it('accepts valid usernames (2-32 chars)', () => {
    fc.assert(
      fc.property(trimmedString(2, 32), (username) => {
        expect(usernameSchema.parse(username)).toBe(username);
      }),
    );
  });

  it('rejects empty string', () => {
    expect(() => usernameSchema.parse('')).toThrow();
  });

  it('rejects strings shorter than 2 characters', () => {
    expect(() => usernameSchema.parse('a')).toThrow();
  });

  it('rejects strings longer than 32 characters', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 33, maxLength: 50 }).filter((s) => s.trim().length > 32),
        (username) => {
          expect(() => usernameSchema.parse(username)).toThrow();
        },
      ),
    );
  });
});

describe('profileFiltersSchema', () => {
  it('applies default values when fields are omitted', () => {
    const result = profileFiltersSchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.search).toBeUndefined();
    expect(result.fitnessLevel).toBeUndefined();
  });

  it('accepts valid filter combinations', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 10, max: 50 }),
        fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
        fc.option(fc.constantFrom(...Object.values(FitnessLevel)), { nil: undefined }),
        (page, limit, search, fitnessLevel) => {
          const result = profileFiltersSchema.parse({
            page,
            limit,
            search,
            fitnessLevel,
          });
          expect(result.page).toBe(page);
          expect(result.limit).toBe(limit);
          if (fitnessLevel !== undefined) {
            expect(Object.values(FitnessLevel)).toContain(result.fitnessLevel);
          }
        },
      ),
    );
  });

  it('rejects page < 1', () => {
    expect(() => profileFiltersSchema.parse({ page: 0 })).toThrow();
  });

  it('rejects limit < 10', () => {
    expect(() => profileFiltersSchema.parse({ limit: 5 })).toThrow();
  });

  it('rejects limit > 50', () => {
    expect(() => profileFiltersSchema.parse({ limit: 100 })).toThrow();
  });
});

describe('editProfileSchema', () => {
  it('accepts valid profile edits with all fields', () => {
    fc.assert(
      fc.property(
        trimmedString(2, 32),
        fc.oneof(
          fc.string({ maxLength: 300 }).filter((s) => s.trim().length <= 300),
          fc.constant(null),
          fc.constant(undefined),
        ),
        fc.oneof(
          fc.array(fc.constantFrom(...Object.values(FitnessCategory)), {
            minLength: 0,
            maxLength: 5,
          }),
          fc.constant(undefined),
        ),
        fc.constantFrom(...Object.values(FitnessLevel)),
        (username, bio, preferences, fitnessLevel) => {
          const input: Record<string, unknown> = { username, fitnessLevel, avatar: null };
          if (bio !== undefined) input.bio = bio;
          if (preferences !== undefined) input.preferences = preferences;

          const result = editProfileSchema.parse(input);
          expect(result.username).toBe(username.trim());
          expect(result.fitnessLevel).toBe(fitnessLevel);
        },
      ),
    );
  });

  it('accepts minimum valid profile edit (only required fields)', () => {
    fc.assert(
      fc.property(
        trimmedString(2, 32),
        fc.constantFrom(...Object.values(FitnessLevel)),
        (username, fitnessLevel) => {
          const result = editProfileSchema.parse({ username, fitnessLevel });
          expect(result.username).toBe(username.trim());
          expect(result.fitnessLevel).toBe(fitnessLevel);
          expect(result.bio).toBeUndefined();
        },
      ),
    );
  });

  it('rejects username shorter than 2 characters', () => {
    expect(() =>
      editProfileSchema.parse({ username: 'a', fitnessLevel: 'Beginner' }),
    ).toThrow();
  });

  it('rejects username longer than 32 characters', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 33, maxLength: 50 }).filter((s) => s.trim().length > 32),
        (username) => {
          expect(() =>
            editProfileSchema.parse({ username, fitnessLevel: 'Beginner' }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects invalid fitness level', () => {
    expect(() =>
      editProfileSchema.parse({
        username: 'validuser',
        fitnessLevel: 'InvalidLevel',
      }),
    ).toThrow();
  });
});
