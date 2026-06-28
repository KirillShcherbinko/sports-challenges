import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { calculatePersonalizationScore, sortByPersonalization } from '@/entities/challenge/lib/personalization';
import type { FitnessCategory, ChallengeDifficulty, FitnessLevel } from '@/shared/types';

const fitnessCategoryArb = fc.constantFrom<FitnessCategory>(
  'Strength', 'Cardio', 'Flexibility', 'Endurance', 'Mobility',
  'Balance', 'Speed', 'Agility', 'Power', 'WeightLoss', 'MuscleGain',
  'Nutrition', 'Hydration', 'Sleep', 'Recovery', 'MentalHealth',
  'Mindfulness', 'DailySteps', 'Posture', 'Yoga', 'Calisthenics',
  'Running', 'Cycling', 'Swimming', 'Dance', 'MartialArts',
);

const challengeDifficultyArb = fc.constantFrom<ChallengeDifficulty>('Easy', 'Medium', 'Hard');

const fitnessLevelArb = fc.constantFrom<FitnessLevel>('Beginner', 'Intermediate', 'Advanced');

const challengeDtoArb = fc.record({
  id: fc.string(),
  title: fc.string(),
  description: fc.string(),
  categories: fc.array(fitnessCategoryArb),
  difficulty: challengeDifficultyArb,
  coverImageUrl: fc.oneof(fc.string(), fc.constant(null)),
  likesCount: fc.nat({ max: 10000 }),
  participantsCount: fc.nat({ max: 10000 }),
  creator: fc.record({
    username: fc.string(),
    avatarUrl: fc.oneof(fc.string(), fc.constant(null)),
  }),
});

describe('calculatePersonalizationScore', () => {
  it('should return 0 when no categories match and difficulty does not match', () => {
    fc.assert(
      fc.property(
        challengeDtoArb,
        fc.array(fitnessCategoryArb),
        fitnessLevelArb,
        (challenge, preferences, fitnessLevel) => {
          fc.pre(!preferences.some((p) => challenge.categories.includes(p)));
          fc.pre(
            !(
              (challenge.difficulty === 'Easy' && fitnessLevel === 'Beginner') ||
              (challenge.difficulty === 'Medium' && fitnessLevel === 'Intermediate') ||
              (challenge.difficulty === 'Hard' && fitnessLevel === 'Advanced')
            ),
          );
          const score = calculatePersonalizationScore(challenge, preferences, fitnessLevel);
          expect(score).toBe(0);
        },
      ),
    );
  });

  it('should add 1 point for each matching category', () => {
    fc.assert(
      fc.property(
        challengeDtoArb,
        fitnessLevelArb,
        (challenge, fitnessLevel) => {
          fc.pre(challenge.categories.length > 0);
          const category = challenge.categories[0];
          const score = calculatePersonalizationScore(
            challenge,
            [category],
            fitnessLevel,
          );
          expect(score).toBeGreaterThanOrEqual(1);
        },
      ),
    );
  });

  it('should add 2 points for matching difficulty', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        fc.string().filter((s) => s.length >= 0),
        fc.constantFrom<ChallengeDifficulty>('Easy', 'Medium', 'Hard'),
        (id, title, desc, difficulty) => {
          const challenge = {
            id,
            title,
            description: desc,
            categories: [] as FitnessCategory[],
            difficulty,
            coverImageUrl: null,
            likesCount: 0,
            participantsCount: 0,
            creator: { username: 'u', avatarUrl: null },
          };
          const levelMap: Record<ChallengeDifficulty, FitnessLevel> = {
            Easy: 'Beginner',
            Medium: 'Intermediate',
            Hard: 'Advanced',
          };
          const score = calculatePersonalizationScore(challenge, [], levelMap[difficulty]);
          expect(score).toBe(2);
        },
      ),
    );
  });

  it('should return score >= 0 for any input', () => {
    fc.assert(
      fc.property(
        challengeDtoArb,
        fc.array(fitnessCategoryArb),
        fitnessLevelArb,
        (challenge, preferences, fitnessLevel) => {
          const score = calculatePersonalizationScore(challenge, preferences, fitnessLevel);
          expect(score).toBeGreaterThanOrEqual(0);
        },
      ),
    );
  });

  it('should return higher or equal score with more matching preferences', () => {
    fc.assert(
      fc.property(
        challengeDtoArb,
        fc.array(fitnessCategoryArb),
        fc.array(fitnessCategoryArb),
        fitnessLevelArb,
        (challenge, prefs1, prefs2, fitnessLevel) => {
          const score1 = calculatePersonalizationScore(challenge, prefs1, fitnessLevel);
          const score2 = calculatePersonalizationScore(challenge, [...prefs1, ...prefs2], fitnessLevel);
          expect(score2).toBeGreaterThanOrEqual(score1);
        },
      ),
    );
  });
});

describe('sortByPersonalization', () => {
  it('should return an array of the same length', () => {
    fc.assert(
      fc.property(
        fc.array(challengeDtoArb),
        fc.array(fitnessCategoryArb),
        fitnessLevelArb,
        (challenges, preferences, fitnessLevel) => {
          const result = sortByPersonalization(challenges, preferences, fitnessLevel);
          expect(result).toHaveLength(challenges.length);
        },
      ),
    );
  });

  it('should return scores in non-increasing order', () => {
    fc.assert(
      fc.property(
        fc.array(challengeDtoArb, { minLength: 2, maxLength: 20 }),
        fc.array(fitnessCategoryArb),
        fitnessLevelArb,
        (challenges, preferences, fitnessLevel) => {
          const result = sortByPersonalization(challenges, preferences, fitnessLevel);
          for (let i = 1; i < result.length; i++) {
            const prev = calculatePersonalizationScore(result[i - 1], preferences, fitnessLevel);
            const curr = calculatePersonalizationScore(result[i], preferences, fitnessLevel);
            expect(prev).toBeGreaterThanOrEqual(curr);
          }
        },
      ),
    );
  });

  it('should not mutate the original array', () => {
    fc.assert(
      fc.property(
        fc.array(challengeDtoArb, { minLength: 1, maxLength: 10 }),
        fc.array(fitnessCategoryArb),
        fitnessLevelArb,
        (challenges, preferences, fitnessLevel) => {
          const original = [...challenges];
          sortByPersonalization(challenges, preferences, fitnessLevel);
          expect(challenges).toEqual(original);
        },
      ),
    );
  });

  it('should return empty array when given empty array', () => {
    const result = sortByPersonalization([], [], 'Beginner');
    expect(result).toEqual([]);
  });
});
