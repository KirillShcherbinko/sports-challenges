import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import {
  mapProfileToDto,
  mapProfileDetailToDto,
  mapEditProfileToDto,
  mapProfileMutationToDto,
} from '@/entities/profile/lib/mappers';
import type { FitnessCategory, FitnessLevel } from '@/shared/types';

const fitnessLevelArb = fc.constantFrom<FitnessLevel>('Beginner', 'Intermediate', 'Advanced');

const fitnessCategoryArb = fc.constantFrom<FitnessCategory>(
  'Strength', 'Cardio', 'Flexibility', 'Endurance', 'Mobility',
  'Balance', 'Speed', 'Agility', 'Power', 'WeightLoss', 'MuscleGain',
  'Nutrition', 'Hydration', 'Sleep', 'Recovery', 'MentalHealth',
  'Mindfulness', 'DailySteps', 'Posture', 'Yoga', 'Calisthenics',
  'Running', 'Cycling', 'Swimming', 'Dance', 'MartialArts',
);

const profileArb = fc.record({
  id: fc.string(),
  username: fc.string(),
  avatarUrl: fc.oneof(fc.string(), fc.constant(null)),
  avatarPath: fc.oneof(fc.string(), fc.constant(null)),
  fitnessLevel: fitnessLevelArb,
  preferences: fc.array(fitnessCategoryArb),
  bio: fc.oneof(fc.string(), fc.constant(null)),
  streakCount: fc.nat({ max: 1000 }),
  totalCompletedTasks: fc.nat({ max: 10000 }),
});

describe('mapProfileToDto', () => {
  it('should preserve id, username, avatarUrl, fitnessLevel', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const result = mapProfileToDto(data as any);
        expect(result.id).toBe(data.id);
        expect(result.username).toBe(data.username);
        expect(result.avatarUrl).toBe(data.avatarUrl);
        expect(result.fitnessLevel).toBe(data.fitnessLevel);
      }),
    );
  });

  it('should handle null avatarUrl', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const input = { ...data, avatarUrl: null as any };
        const result = mapProfileToDto(input as any);
        expect(result.avatarUrl).toBeNull();
      }),
    );
  });
});

describe('mapProfileDetailToDto', () => {
  it('should preserve all detail fields', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const result = mapProfileDetailToDto(data as any);
        expect(result.id).toBe(data.id);
        expect(result.username).toBe(data.username);
        expect(result.avatarUrl).toBe(data.avatarUrl);
        expect(result.fitnessLevel).toBe(data.fitnessLevel);
        expect(result.bio).toBe(data.bio);
        expect(result.preferences).toEqual(data.preferences);
        expect(result.streakCount).toBe(data.streakCount);
        expect(result.totalCompletedTasks).toBe(data.totalCompletedTasks);
      }),
    );
  });

  it('should handle null bio', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const input = { ...data, bio: null as any };
        const result = mapProfileDetailToDto(input as any);
        expect(result.bio).toBeNull();
      }),
    );
  });

  it('should handle 0 streakCount and totalCompletedTasks', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const input = { ...data, streakCount: 0, totalCompletedTasks: 0 };
        const result = mapProfileDetailToDto(input as any);
        expect(result.streakCount).toBe(0);
        expect(result.totalCompletedTasks).toBe(0);
      }),
    );
  });

  it('should handle empty preferences', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const input = { ...data, preferences: [] };
        const result = mapProfileDetailToDto(input as any);
        expect(result.preferences).toEqual([]);
      }),
    );
  });
});

describe('mapEditProfileToDto', () => {
  it('should preserve all edit fields including avatarPath', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const result = mapEditProfileToDto(data as any);
        expect(result.id).toBe(data.id);
        expect(result.username).toBe(data.username);
        expect(result.avatarUrl).toBe(data.avatarUrl);
        expect(result.fitnessLevel).toBe(data.fitnessLevel);
        expect(result.bio).toBe(data.bio);
        expect(result.preferences).toEqual(data.preferences);
        expect(result.avatarPath).toBe(data.avatarPath);
      }),
    );
  });

  it('should handle null avatarPath', () => {
    fc.assert(
      fc.property(profileArb, (data) => {
        const input = { ...data, avatarPath: null as any };
        const result = mapEditProfileToDto(input as any);
        expect(result.avatarPath).toBeNull();
      }),
    );
  });
});

describe('mapProfileMutationToDto', () => {
  it('should preserve id', () => {
    fc.assert(
      fc.property(fc.string(), (id) => {
        const result = mapProfileMutationToDto({ id } as any);
        expect(result.id).toBe(id);
      }),
    );
  });
});
