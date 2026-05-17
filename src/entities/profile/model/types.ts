import type { FitnessLevel } from '@/shared/generated/prisma/enums';

export type TProfileFilters = {
  search?: string;
  fitnessLevel?: FitnessLevel;
  page: number;
  limit: number;
};
