import { describe, expect, it } from 'vitest';
import { FitnessLevel } from '@/shared/types';
import { FITNESS_LEVEL_DATA } from '@/shared/config/fitness-level-data';
import { FITNESS_LEVEL_LABELS } from '@/shared/config/fitness-level-labels';

describe('FITNESS_LEVEL_DATA', () => {
  it('covers every FitnessLevel', () => {
    const values = FITNESS_LEVEL_DATA.map((i) => i.value);
    const enumValues = Object.values(FitnessLevel);
    expect(values.sort()).toEqual(enumValues.sort());
  });

  it('each item label matches FITNESS_LEVEL_LABELS', () => {
    for (const item of FITNESS_LEVEL_DATA) {
      expect(item.label).toBe(FITNESS_LEVEL_LABELS[item.value]);
    }
  });

  it('each item has non-empty value and label', () => {
    for (const item of FITNESS_LEVEL_DATA) {
      expect(item.value).toBeTruthy();
      expect(item.label).toBeTruthy();
    }
  });
});
