import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import {
  mapChallengeToDto,
  mapChallengeDetailToDto,
  mapChallengeMutationToDto,
  mapEditChallengeToDto,
} from '@/entities/challenge/lib/mappers';
import type {
  FitnessCategory,
  ChallengeDifficulty,
  FitnessLevel,
} from '@/shared/types';

const fitnessCategoryArb = fc.constantFrom<FitnessCategory>(
  'Strength', 'Cardio', 'Flexibility', 'Endurance', 'Mobility',
  'Balance', 'Speed', 'Agility', 'Power', 'WeightLoss', 'MuscleGain',
  'Nutrition', 'Hydration', 'Sleep', 'Recovery', 'MentalHealth',
  'Mindfulness', 'DailySteps', 'Posture', 'Yoga', 'Calisthenics',
  'Running', 'Cycling', 'Swimming', 'Dance', 'MartialArts',
);

const challengeDifficultyArb = fc.constantFrom<ChallengeDifficulty>('Easy', 'Medium', 'Hard');

const fitnessLevelArb = fc.constantFrom<FitnessLevel>('Beginner', 'Intermediate', 'Advanced');

const challengeWithCreatorArb = fc.record({
  id: fc.string(),
  title: fc.string(),
  description: fc.string(),
  categories: fc.array(fitnessCategoryArb),
  difficulty: challengeDifficultyArb,
  coverImageUrl: fc.oneof(fc.string(), fc.constant(null)),
  likesCount: fc.nat({ max: 10000 }),
  participantsCount: fc.nat({ max: 10000 }),
  durationDays: fc.nat({ max: 365 }),
  creator: fc.record({
    id: fc.string(),
    username: fc.string(),
    avatarUrl: fc.oneof(fc.string(), fc.constant(null)),
    fitnessLevel: fitnessLevelArb,
  }),
});

const challengeArb = fc.record({
  id: fc.string(),
  title: fc.string(),
  description: fc.string(),
  categories: fc.array(fitnessCategoryArb),
  difficulty: challengeDifficultyArb,
  coverImageUrl: fc.oneof(fc.string(), fc.constant(null)),
  coverImagePath: fc.oneof(fc.string(), fc.constant(null)),
  likesCount: fc.nat({ max: 10000 }),
  participantsCount: fc.nat({ max: 10000 }),
  durationDays: fc.nat({ max: 365 }),
  creatorId: fc.string(),
});

describe('mapChallengeToDto', () => {
  it('should preserve id, title, description, categories, difficulty', () => {
    fc.assert(
      fc.property(challengeWithCreatorArb, (data) => {
        const result = mapChallengeToDto(data as any);
        expect(result.id).toBe(data.id);
        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.categories).toEqual(data.categories);
        expect(result.difficulty).toBe(data.difficulty);
      }),
    );
  });

  it('should include likesCount and participantsCount as numbers', () => {
    fc.assert(
      fc.property(challengeWithCreatorArb, (data) => {
        const result = mapChallengeToDto(data as any);
        expect(typeof result.likesCount).toBe('number');
        expect(typeof result.participantsCount).toBe('number');
        expect(result.likesCount).toBe(data.likesCount);
        expect(result.participantsCount).toBe(data.participantsCount);
      }),
    );
  });

  it('should include creator with username and avatarUrl', () => {
    fc.assert(
      fc.property(challengeWithCreatorArb, (data) => {
        const result = mapChallengeToDto(data as any);
        expect(result.creator).toBeDefined();
        expect(result.creator.username).toBe(data.creator.username);
        expect(result.creator.avatarUrl).toBe(data.creator.avatarUrl);
      }),
    );
  });

  it('should handle null coverImageUrl', () => {
    fc.assert(
      fc.property(
        challengeWithCreatorArb,
        fc.constant(null),
        (data, _) => {
          const input = { ...data, coverImageUrl: null as any };
          const result = mapChallengeToDto(input as any);
          expect(result.coverImageUrl).toBeNull();
        },
      ),
    );
  });
});

describe('mapChallengeDetailToDto', () => {
  it('should preserve id, title, description, categories, difficulty', () => {
    fc.assert(
      fc.property(challengeWithCreatorArb, (data) => {
        const result = mapChallengeDetailToDto(data as any);
        expect(result.id).toBe(data.id);
        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.categories).toEqual(data.categories);
        expect(result.difficulty).toBe(data.difficulty);
      }),
    );
  });

  it('should include durationDays', () => {
    fc.assert(
      fc.property(challengeWithCreatorArb, (data) => {
        const result = mapChallengeDetailToDto(data as any);
        expect(result.durationDays).toBe(data.durationDays);
      }),
    );
  });

  it('should include creator with fitnessLevel', () => {
    fc.assert(
      fc.property(challengeWithCreatorArb, (data) => {
        const result = mapChallengeDetailToDto(data as any);
        expect(result.creator).toBeDefined();
        expect(result.creator.username).toBe(data.creator.username);
        expect(result.creator.avatarUrl).toBe(data.creator.avatarUrl);
        expect(result.creator.fitnessLevel).toBe(data.creator.fitnessLevel);
      }),
    );
  });
});

describe('mapChallengeMutationToDto', () => {
  it('should preserve id and title', () => {
    fc.assert(
      fc.property(challengeArb, (data) => {
        const result = mapChallengeMutationToDto(data as any);
        expect(result.id).toBe(data.id);
        expect(result.title).toBe(data.title);
      }),
    );
  });
});

describe('mapEditChallengeToDto', () => {
  it('should preserve all fields', () => {
    fc.assert(
      fc.property(challengeArb, (data) => {
        const result = mapEditChallengeToDto(data as any);
        expect(result.id).toBe(data.id);
        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.difficulty).toBe(data.difficulty);
        expect(result.categories).toEqual(data.categories);
        expect(result.coverImageUrl).toBe(data.coverImageUrl);
        expect(result.coverImagePath).toBe(data.coverImagePath);
        expect(result.durationDays).toBe(data.durationDays);
      }),
    );
  });

  it('should handle null coverImageUrl and coverImagePath', () => {
    fc.assert(
      fc.property(
        challengeArb,
        fc.constant(null),
        (data, _) => {
          const input = { ...data, coverImageUrl: null as any, coverImagePath: null as any };
          const result = mapEditChallengeToDto(input as any);
          expect(result.coverImageUrl).toBeNull();
          expect(result.coverImagePath).toBeNull();
        },
      ),
    );
  });
});
