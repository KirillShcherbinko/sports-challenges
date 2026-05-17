import { FitnessLevel } from '@/shared/generated/prisma/enums';
import { z } from 'zod';
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT, MIN_LIMIT, MIN_PAGE } from './consts';

export const profileFiltersSchema = z.object({
  search: z.string().trim().optional(),
  fitnessLevel: z.enum(FitnessLevel).optional(),
  page: z.coerce.number().int().min(MIN_PAGE).default(DEFAULT_PAGE),
  limit: z.coerce.number().int().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
});
