import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { mapToTaskCompletionDto, mapToTaskCompletionMutationDto } from '@/entities/task-completion/lib/mappers';

const taskCompletionArb = fc.record({
  profileId: fc.string(),
  challengeId: fc.string(),
  dayNumber: fc.nat({ max: 365 }),
  isCompleted: fc.boolean(),
  completedAt: fc.oneof(fc.date(), fc.constant(null)),
  dailyTask: fc.record({
    title: fc.string(),
    dayNumber: fc.nat({ max: 365 }),
  }),
  createdAt: fc.date(),
});

describe('mapToTaskCompletionDto', () => {
  it('should set id as challengeId_profileId_dayNumber', () => {
    fc.assert(
      fc.property(taskCompletionArb, (data) => {
        const result = mapToTaskCompletionDto(data as any);
        expect(result.id).toBe(`${data.challengeId}_${data.profileId}_${data.dayNumber}`);
      }),
    );
  });

  it('should preserve isCompleted and completedAt', () => {
    fc.assert(
      fc.property(taskCompletionArb, (data) => {
        const result = mapToTaskCompletionDto(data as any);
        expect(result.isCompleted).toBe(data.isCompleted);
        expect(result.completedAt).toBe(data.completedAt);
      }),
    );
  });

  it('should include dailyTask with title and dayNumber', () => {
    fc.assert(
      fc.property(taskCompletionArb, (data) => {
        const result = mapToTaskCompletionDto(data as any);
        expect(result.dailyTask.title).toBe(data.dailyTask.title);
        expect(result.dailyTask.dayNumber).toBe(data.dailyTask.dayNumber);
      }),
    );
  });

  it('should handle null completedAt', () => {
    fc.assert(
      fc.property(taskCompletionArb, (data) => {
        const input = { ...data, completedAt: null as any };
        const result = mapToTaskCompletionDto(input as any);
        expect(result.completedAt).toBeNull();
      }),
    );
  });
});

describe('mapToTaskCompletionMutationDto', () => {
  it('should set id as challengeId_profileId_dayNumber', () => {
    fc.assert(
      fc.property(taskCompletionArb, (data) => {
        const result = mapToTaskCompletionMutationDto(data as any);
        expect(result.id).toBe(`${data.challengeId}_${data.profileId}_${data.dayNumber}`);
      }),
    );
  });

  it('should include dailyTask with title and dayNumber only', () => {
    fc.assert(
      fc.property(taskCompletionArb, (data) => {
        const result = mapToTaskCompletionMutationDto(data as any);
        expect(result.dailyTask.title).toBe(data.dailyTask.title);
        expect(result.dailyTask.dayNumber).toBe(data.dailyTask.dayNumber);
        expect(Object.keys(result)).toEqual(['id', 'dailyTask']);
        expect(Object.keys(result.dailyTask)).toEqual(['title', 'dayNumber']);
      }),
    );
  });
});
