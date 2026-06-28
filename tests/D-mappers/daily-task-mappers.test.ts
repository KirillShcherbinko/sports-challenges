import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { mapToDailyTaskDto, mapToDailyTaskMutationDto } from '@/entities/daily-task/lib/mappers';
import type { FitnessCategory } from '@/shared/types';

const fitnessCategoryArb = fc.constantFrom<FitnessCategory>(
  'Strength', 'Cardio', 'Flexibility', 'Endurance', 'Mobility',
  'Balance', 'Speed', 'Agility', 'Power', 'WeightLoss', 'MuscleGain',
  'Nutrition', 'Hydration', 'Sleep', 'Recovery', 'MentalHealth',
  'Mindfulness', 'DailySteps', 'Posture', 'Yoga', 'Calisthenics',
  'Running', 'Cycling', 'Swimming', 'Dance', 'MartialArts',
);

const dailyTaskArb = fc.record({
  challengeId: fc.string(),
  dayNumber: fc.nat({ max: 365 }),
  title: fc.string(),
  description: fc.string(),
  exerciseType: fitnessCategoryArb,
});

describe('mapToDailyTaskDto', () => {
  it('should set id as challengeId-dayNumber', () => {
    fc.assert(
      fc.property(dailyTaskArb, (data) => {
        const result = mapToDailyTaskDto(data as any);
        expect(result.id).toBe(`${data.challengeId}-${data.dayNumber}`);
      }),
    );
  });

  it('should preserve all fields', () => {
    fc.assert(
      fc.property(dailyTaskArb, (data) => {
        const result = mapToDailyTaskDto(data as any);
        expect(result.title).toBe(data.title);
        expect(result.description).toBe(data.description);
        expect(result.exerciseType).toBe(data.exerciseType);
        expect(result.dayNumber).toBe(data.dayNumber);
      }),
    );
  });
});

describe('mapToDailyTaskMutationDto', () => {
  it('should set id as challengeId-dayNumber', () => {
    fc.assert(
      fc.property(dailyTaskArb, (data) => {
        const result = mapToDailyTaskMutationDto(data as any);
        expect(result.id).toBe(`${data.challengeId}-${data.dayNumber}`);
      }),
    );
  });

  it('should preserve title and dayNumber only', () => {
    fc.assert(
      fc.property(dailyTaskArb, (data) => {
        const result = mapToDailyTaskMutationDto(data as any);
        expect(result.title).toBe(data.title);
        expect(result.dayNumber).toBe(data.dayNumber);
        expect(Object.keys(result)).toEqual(['id', 'title', 'dayNumber']);
      }),
    );
  });
});
