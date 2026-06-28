import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import {
  challengeFiltersSchema,
  challengeSchema,
  challengeSchemaWithId,
} from '@/entities/challenge/model/schemas';
import { ChallengeDifficulty, FitnessCategory } from '@/shared/types';

const trimmedString = (min: number, max: number) =>
  fc
    .string({ minLength: min, maxLength: max })
    .filter((s) => s.trim().length >= min && s.trim().length <= max);

const longString = (min: number, max: number) =>
  fc.string({ minLength: min, maxLength: max }).filter((s) => s.trim().length >= min);

describe('challengeFiltersSchema', () => {
  it('applies default values when fields are omitted', () => {
    const result = challengeFiltersSchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(12);
    expect(result.useCurrentUser).toBe(false);
    expect(result.personalize).toBe(false);
  });

  it('accepts valid filter combinations', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 10, max: 50 }),
        fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
        fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
        fc.option(fc.constantFrom(...Object.values(ChallengeDifficulty)), {
          nil: undefined,
        }),
        fc.option(fc.boolean(), { nil: undefined }),
        fc.boolean(),
        fc.boolean(),
        (page, limit, search, creatorName, difficulty, isPublished, useCurrentUser, personalize) => {
          const result = challengeFiltersSchema.parse({
            page,
            limit,
            search,
            creatorName,
            difficulty,
            isPublished,
            useCurrentUser,
            personalize,
          });
          expect(result.page).toBe(page);
          expect(result.limit).toBe(limit);
          expect(result.useCurrentUser).toBe(useCurrentUser);
          expect(result.personalize).toBe(personalize);
        },
      ),
    );
  });

  it('transforms comma-separated categories into array', () => {
    const result = challengeFiltersSchema.parse({
      categories: 'Strength,Cardio,Running',
    });
    expect(result.categories).toEqual(['Strength', 'Cardio', 'Running']);
  });

  it('handles empty categories string as undefined', () => {
    const result = challengeFiltersSchema.parse({ categories: '' });
    expect(result.categories).toBeUndefined();
  });

  it('rejects page < 1', () => {
    expect(() => challengeFiltersSchema.parse({ page: 0 })).toThrow();
  });

  it('rejects limit < 10', () => {
    expect(() => challengeFiltersSchema.parse({ limit: 5 })).toThrow();
  });

  it('rejects limit > 50', () => {
    expect(() => challengeFiltersSchema.parse({ limit: 100 })).toThrow();
  });
});

describe('challengeSchema', () => {
  it('accepts valid challenge with all fields', () => {
    fc.assert(
      fc.property(
        trimmedString(2, 64),
        trimmedString(10, 300),
        fc.constantFrom(...Object.values(ChallengeDifficulty)),
        fc.option(
          fc.array(fc.constantFrom(...Object.values(FitnessCategory)), {
            minLength: 0,
            maxLength: 5,
          }),
          { nil: undefined },
        ),
        (title, description, difficulty, categories) => {
          const result = challengeSchema.parse({
            title,
            description,
            difficulty,
            categories,
            coverImage: null,
          });
          expect(result.title).toBe(title.trim());
          expect(result.description).toBe(description.trim());
          expect(result.difficulty).toBe(difficulty);
        },
      ),
    );
  });

  it('accepts minimal challenge (only required fields)', () => {
    fc.assert(
      fc.property(
        trimmedString(2, 64),
        trimmedString(10, 300),
        fc.constantFrom(...Object.values(ChallengeDifficulty)),
        (title, description, difficulty) => {
          const result = challengeSchema.parse({ title, description, difficulty });
          expect(result.title).toBe(title.trim());
          expect(result.description).toBe(description.trim());
          expect(result.difficulty).toBe(difficulty);
          expect(result.categories).toEqual([]);
        },
      ),
    );
  });

  it('rejects title shorter than 2 characters', () => {
    expect(() =>
      challengeSchema.parse({
        title: 'A',
        description: 'A valid description that is long enough',
        difficulty: 'Easy',
      }),
    ).toThrow();
  });

  it('rejects title longer than 64 characters', () => {
    fc.assert(
      fc.property(
        longString(65, 100),
        (title) => {
          expect(() =>
            challengeSchema.parse({
              title,
              description: 'A valid description that is long enough',
              difficulty: 'Easy',
            }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects description shorter than 10 characters', () => {
    expect(() =>
      challengeSchema.parse({
        title: 'Valid title',
        description: 'Short',
        difficulty: 'Easy',
      }),
    ).toThrow();
  });

  it('rejects description longer than 300 characters', () => {
    fc.assert(
      fc.property(
        longString(301, 400),
        (description) => {
          expect(() =>
            challengeSchema.parse({
              title: 'Valid title',
              description,
              difficulty: 'Easy',
            }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects invalid difficulty', () => {
    expect(() =>
      challengeSchema.parse({
        title: 'Valid title',
        description: 'A valid description that is long enough',
        difficulty: 'Invalid',
      }),
    ).toThrow();
  });
});

describe('challengeSchemaWithId', () => {
  it('accepts challenge data with id', () => {
    fc.assert(
      fc.property(
        trimmedString(2, 64),
        trimmedString(10, 300),
        fc.constantFrom(...Object.values(ChallengeDifficulty)),
        fc.uuid(),
        (title, description, difficulty, id) => {
          const result = challengeSchemaWithId.parse({
            title,
            description,
            difficulty,
            id,
            coverImage: null,
          });
          expect(result.id).toBe(id.toLowerCase());
          expect(result.title).toBe(title.trim());
          expect(result.difficulty).toBe(difficulty);
        },
      ),
    );
  });

  it('rejects empty id', () => {
    expect(() =>
      challengeSchemaWithId.parse({
        title: 'Valid title',
        description: 'A valid description that is long enough',
        difficulty: 'Easy',
        id: '',
      }),
    ).toThrow();
  });
});
