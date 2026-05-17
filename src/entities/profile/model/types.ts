import type { FitnessLevel } from '@/shared/generated/prisma/enums';
import type { profileFiltersSchema } from './schemas';
import type { z } from 'zod';
import type { Profile } from '@/shared/generated/prisma/client';

export type TProfileFilters = {
  search?: string;
  fitnessLevel?: FitnessLevel;
  page: number;
  limit: number;
};

export type TProfileFiltersSchema = z.infer<typeof profileFiltersSchema>;

export type TProfilesData = {
  items: Profile[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
