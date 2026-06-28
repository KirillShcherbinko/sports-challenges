import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { mapProfileChallengeToDto, mapProfileChallengeMutationToDto } from '@/entities/profile-challenge/lib/mappers';
import type { ProfileChallengeStatus } from '@/shared/types';

const profileChallengeStatusArb = fc.constantFrom<ProfileChallengeStatus>('Active', 'Completed', 'Failed');

const profileChallengeArb = fc.record({
  profileId: fc.string(),
  challengeId: fc.string(),
  status: profileChallengeStatusArb,
  currentDay: fc.nat({ max: 365 }),
  challenge: fc.record({
    id: fc.string(),
    title: fc.string(),
    coverImageUrl: fc.oneof(fc.string(), fc.constant(null)),
    durationDays: fc.nat({ max: 365 }).filter((n) => n > 0),
  }),
  createdAt: fc.date(),
  updatedAt: fc.date(),
});

describe('mapProfileChallengeToDto', () => {
  it('should set id as profileId_challengeId', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const result = mapProfileChallengeToDto(data as any);
        expect(result.id).toBe(`${data.profileId}_${data.challengeId}`);
      }),
    );
  });

  it('should compute percentage = Math.round(currentDay * 100 / durationDays)', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const result = mapProfileChallengeToDto(data as any);
        const expected = Math.round((data.currentDay * 100) / data.challenge.durationDays);
        expect(result.percentage).toBe(expected);
      }),
    );
  });

  it('should preserve challengeId, status, currentDay', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const result = mapProfileChallengeToDto(data as any);
        expect(result.challengeId).toBe(data.challengeId);
        expect(result.status).toBe(data.status);
        expect(result.currentDay).toBe(data.currentDay);
      }),
    );
  });

  it('should include challenge title, coverImageUrl, durationDays', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const result = mapProfileChallengeToDto(data as any);
        expect(result.challenge.title).toBe(data.challenge.title);
        expect(result.challenge.coverImageUrl).toBe(data.challenge.coverImageUrl);
        expect(result.challenge.durationDays).toBe(data.challenge.durationDays);
      }),
    );
  });

  it('should include createdAt and updatedAt', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const result = mapProfileChallengeToDto(data as any);
        expect(result.createdAt).toBe(data.createdAt);
        expect(result.updatedAt).toBe(data.updatedAt);
      }),
    );
  });

  it('should handle null coverImageUrl', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const input = {
          ...data,
          challenge: { ...data.challenge, coverImageUrl: null as any },
        };
        const result = mapProfileChallengeToDto(input as any);
        expect(result.challenge.coverImageUrl).toBeNull();
      }),
    );
  });

  it('should handle 0 currentDay', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const input = { ...data, currentDay: 0 };
        const result = mapProfileChallengeToDto(input as any);
        expect(result.percentage).toBe(0);
      }),
    );
  });
});

describe('mapProfileChallengeMutationToDto', () => {
  it('should set id as challengeId_profileId', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const result = mapProfileChallengeMutationToDto(data as any);
        expect(result.id).toBe(`${data.challengeId}_${data.profileId}`);
      }),
    );
  });

  it('should include challenge title', () => {
    fc.assert(
      fc.property(profileChallengeArb, (data) => {
        const result = mapProfileChallengeMutationToDto(data as any);
        expect(result.challenge.title).toBe(data.challenge.title);
      }),
    );
  });
});
