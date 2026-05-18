import type { FitnessLevel } from '@/shared/types';
import type { MantineColor } from '@mantine/core';

export const FITNESS_LEVEL_COLORS: Record<FitnessLevel, MantineColor> = {
  beginner: 'gray',
  intermediate: 'blue',
  advanced: 'orange',
} as const;
