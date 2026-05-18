import { z } from 'zod';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_BIO_LENGTH,
  MAX_LIMIT,
  MAX_USERNAME_LENGTH,
  MIN_LIMIT,
  MIN_PAGE,
  MIN_USERNAME_LENGTH,
} from './consts';
import { FitnessLevel } from '@/shared/types';

export const profileFiltersSchema = z.object({
  search: z.string().trim().optional(),
  fitnessLevel: z.enum(FitnessLevel).optional(),
  page: z.coerce.number().int().min(MIN_PAGE).default(DEFAULT_PAGE),
  limit: z.coerce.number().int().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
});

export const editProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(MIN_USERNAME_LENGTH, 'Минимум 3 символа')
    .max(MAX_USERNAME_LENGTH, 'Максимум 32 символа'),
  bio: z.string().trim().max(MAX_BIO_LENGTH, 'Максимум 300 символов').nullable().optional(),
  fitnessLevel: z.enum(FitnessLevel),
  avatar: z.instanceof(File).nullable().optional(),
});
