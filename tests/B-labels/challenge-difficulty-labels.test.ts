import { describe, expect, it } from 'vitest';
import { ChallengeDifficulty } from '@/shared/generated/prisma/enums';
import { CHALLENGE_DIFFICULTY_LABELS } from '@/shared/config/challenge-difficulty-labels';

describe('CHALLENGE_DIFFICULTY_LABELS', () => {
  it('covers every ChallengeDifficulty enum value', () => {
    const enumValues = Object.values(ChallengeDifficulty);
    const labelKeys = Object.keys(CHALLENGE_DIFFICULTY_LABELS);
    expect(labelKeys.sort()).toEqual(enumValues.sort());
  });

  it('has non-empty Russian labels for each difficulty', () => {
    for (const label of Object.values(CHALLENGE_DIFFICULTY_LABELS)) {
      expect(label).toBeTruthy();
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it('has unique labels', () => {
    const labels = Object.values(CHALLENGE_DIFFICULTY_LABELS);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
