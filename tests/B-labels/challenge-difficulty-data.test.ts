import { describe, expect, it } from 'vitest';
import { ChallengeDifficulty } from '@/shared/types';
import { CHALLENGE_DIFFICULTY_DATA } from '@/shared/config/challenge-difficulty-data';
import { CHALLENGE_DIFFICULTY_LABELS } from '@/shared/config/challenge-difficulty-labels';

describe('CHALLENGE_DIFFICULTY_DATA', () => {
  it('covers every ChallengeDifficulty', () => {
    const values = CHALLENGE_DIFFICULTY_DATA.map((i) => i.value);
    const enumValues = Object.values(ChallengeDifficulty);
    expect(values.sort()).toEqual(enumValues.sort());
  });

  it('each item label matches CHALLENGE_DIFFICULTY_LABELS', () => {
    for (const item of CHALLENGE_DIFFICULTY_DATA) {
      expect(item.label).toBe(CHALLENGE_DIFFICULTY_LABELS[item.value]);
    }
  });

  it('each item has non-empty value and label', () => {
    for (const item of CHALLENGE_DIFFICULTY_DATA) {
      expect(item.value).toBeTruthy();
      expect(item.label).toBeTruthy();
    }
  });
});
