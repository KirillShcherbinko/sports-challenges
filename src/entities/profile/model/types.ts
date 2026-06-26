import type { FitnessLevel } from '@/shared/types';
import type { editProfileSchema, profileFiltersSchema } from './schemas';
import type { z } from 'zod';

export type TProfileFilters = {
  search?: string;
  fitnessLevel?: FitnessLevel;
  page: number;
  limit: number;
};

export type TProfileFiltersSchema = z.infer<typeof profileFiltersSchema>;
export type TEditProfileSchema = z.infer<typeof editProfileSchema>;
