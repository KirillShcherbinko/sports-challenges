import { describe, expect, it } from 'vitest';
import { ProfileChallengeStatus } from '@/shared/generated/prisma/enums';
import { PROFILE_CHALLENGE_STATUS_LABELS } from '@/shared/config/profile-challenge-status-labels';

describe('PROFILE_CHALLENGE_STATUS_LABELS', () => {
  it('covers every ProfileChallengeStatus enum value', () => {
    const enumValues = Object.values(ProfileChallengeStatus);
    const labelKeys = Object.keys(PROFILE_CHALLENGE_STATUS_LABELS);
    expect(labelKeys.sort()).toEqual(enumValues.sort());
  });

  it('has non-empty Russian labels for each status', () => {
    for (const label of Object.values(PROFILE_CHALLENGE_STATUS_LABELS)) {
      expect(label).toBeTruthy();
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it('has unique labels', () => {
    const labels = Object.values(PROFILE_CHALLENGE_STATUS_LABELS);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
