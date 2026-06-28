import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import {
  dailyTaskSchema,
  dailyTaskSchemaWithIds,
  challengeIdAndDayNumberSchema,
} from '@/entities/daily-task/model/schemas';
import { FitnessCategory } from '@/shared/types';

const trimmedString = (min: number, max: number) =>
  fc
    .string({ minLength: min, maxLength: max })
    .filter((s) => s.trim().length >= min && s.trim().length <= max);

const longString = (min: number, max: number) =>
  fc.string({ minLength: min, maxLength: max }).filter((s) => s.trim().length >= min);

describe('dailyTaskSchema', () => {
  it('accepts valid daily task', () => {
    fc.assert(
      fc.property(
        trimmedString(2, 32),
        trimmedString(10, 200),
        fc.constantFrom(...Object.values(FitnessCategory)),
        (title, description, exerciseType) => {
          const result = dailyTaskSchema.parse({ title, description, exerciseType });
          expect(result.title).toBe(title.trim());
          expect(result.description).toBe(description.trim());
          expect(result.exerciseType).toBe(exerciseType);
        },
      ),
    );
  });

  it('rejects title shorter than 2 characters', () => {
    expect(() =>
      dailyTaskSchema.parse({
        title: 'A',
        description: 'A valid description',
        exerciseType: 'Strength',
      }),
    ).toThrow();
  });

  it('rejects title longer than 32 characters', () => {
    fc.assert(
      fc.property(
        longString(33, 50),
        (title) => {
          expect(() =>
            dailyTaskSchema.parse({
              title,
              description: 'A valid description',
              exerciseType: 'Strength',
            }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects description shorter than 10 characters', () => {
    expect(() =>
      dailyTaskSchema.parse({
        title: 'Valid title',
        description: 'Short',
        exerciseType: 'Strength',
      }),
    ).toThrow();
  });

  it('rejects description longer than 200 characters', () => {
    fc.assert(
      fc.property(
        longString(201, 300),
        (description) => {
          expect(() =>
            dailyTaskSchema.parse({
              title: 'Valid title',
              description,
              exerciseType: 'Strength',
            }),
          ).toThrow();
        },
      ),
    );
  });

  it('rejects invalid exercise type', () => {
    expect(() =>
      dailyTaskSchema.parse({
        title: 'Valid title',
        description: 'A valid description',
        exerciseType: 'Invalid',
      }),
    ).toThrow();
  });
});

describe('dailyTaskSchemaWithIds', () => {
  it('accepts valid daily task with challengeId and dayNumber', () => {
    fc.assert(
      fc.property(
        trimmedString(2, 32),
        trimmedString(10, 200),
        fc.constantFrom(...Object.values(FitnessCategory)),
        fc.uuid(),
        fc.integer(),
        (title, description, exerciseType, challengeId, dayNumber) => {
          const result = dailyTaskSchemaWithIds.parse({
            title,
            description,
            exerciseType,
            challengeId,
            dayNumber,
          });
          expect(result.title).toBe(title.trim());
          expect(result.description).toBe(description.trim());
          expect(result.exerciseType).toBe(exerciseType);
          expect(result.challengeId).toBe(challengeId.toLowerCase());
          expect(result.dayNumber).toBe(dayNumber);
        },
      ),
    );
  });

  it('rejects empty challengeId', () => {
    expect(() =>
      dailyTaskSchemaWithIds.parse({
        title: 'Valid title',
        description: 'A valid description',
        exerciseType: 'Strength',
        challengeId: '',
        dayNumber: 1,
      }),
    ).toThrow();
  });
});

describe('challengeIdAndDayNumberSchema', () => {
  it('accepts valid challengeId and dayNumber', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.integer(),
        (challengeId, dayNumber) => {
          const result = challengeIdAndDayNumberSchema.parse({
            challengeId,
            dayNumber,
          });
          expect(result.challengeId).toBe(challengeId.toLowerCase());
          expect(result.dayNumber).toBe(dayNumber);
        },
      ),
    );
  });

  it('rejects empty challengeId', () => {
    expect(() =>
      challengeIdAndDayNumberSchema.parse({ challengeId: '', dayNumber: 1 }),
    ).toThrow();
  });
});
