import { describe, expect, it } from 'vitest';
import { FitnessLevel } from '@/shared/generated/prisma/enums';
import { FITNESS_LEVEL_LABELS } from '@/shared/config/fitness-level-labels';

describe('FITNESS_LEVEL_LABELS', () => {
  it('covers every FitnessLevel enum value', () => {
    const enumValues = Object.values(FitnessLevel);
    const labelKeys = Object.keys(FITNESS_LEVEL_LABELS);
    expect(labelKeys.sort()).toEqual(enumValues.sort());
  });

  it('has non-empty Russian labels for each level', () => {
    for (const label of Object.values(FITNESS_LEVEL_LABELS)) {
      expect(label).toBeTruthy();
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it('has unique labels', () => {
    const labels = Object.values(FITNESS_LEVEL_LABELS);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
