import { describe, expect, it } from 'vitest';
import { FitnessCategory } from '@/shared/generated/prisma/enums';
import { FITNESS_CATEGORY_LABELS } from '@/shared/config/fitness-category-labels';

describe('FITNESS_CATEGORY_LABELS', () => {
  it('covers every FitnessCategory enum value', () => {
    const enumValues = Object.values(FitnessCategory);
    const labelKeys = Object.keys(FITNESS_CATEGORY_LABELS);
    expect(labelKeys.sort()).toEqual(enumValues.sort());
  });

  it('has non-empty Russian labels for each category', () => {
    for (const label of Object.values(FITNESS_CATEGORY_LABELS)) {
      expect(label).toBeTruthy();
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it('has unique labels', () => {
    const labels = Object.values(FITNESS_CATEGORY_LABELS);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
