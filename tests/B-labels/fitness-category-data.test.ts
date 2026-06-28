import { describe, expect, it } from 'vitest';
import { FitnessCategory } from '@/shared/generated/prisma/enums';
import { FITNESS_CATEGORY_DATA } from '@/shared/config/fitness-category-data';
import { FITNESS_CATEGORY_LABELS } from '@/shared/config/fitness-category-labels';

describe('FITNESS_CATEGORY_DATA', () => {
  it('covers every FitnessCategory across all groups', () => {
    const covered = FITNESS_CATEGORY_DATA.flatMap((g) => g.items.map((i) => i.value));
    const enumValues = Object.values(FitnessCategory);
    expect(covered.sort()).toEqual(enumValues.sort());
  });

  it('has no duplicate categories across groups', () => {
    const allValues = FITNESS_CATEGORY_DATA.flatMap((g) => g.items.map((i) => i.value));
    expect(new Set(allValues).size).toBe(allValues.length);
  });

  it('each item label matches FITNESS_CATEGORY_LABELS', () => {
    for (const group of FITNESS_CATEGORY_DATA) {
      for (const item of group.items) {
        expect(item.label).toBe(FITNESS_CATEGORY_LABELS[item.value]);
      }
    }
  });

  it('each group has a non-empty name', () => {
    for (const group of FITNESS_CATEGORY_DATA) {
      expect(group.group).toBeTruthy();
      expect(group.group.length).toBeGreaterThan(0);
    }
  });

  it('each item has non-empty value and label', () => {
    for (const group of FITNESS_CATEGORY_DATA) {
      for (const item of group.items) {
        expect(item.value).toBeTruthy();
        expect(item.label).toBeTruthy();
      }
    }
  });
});
