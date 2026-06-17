import { ChallengeDifficulty, FitnessCategory } from '@/shared/types';
import { z } from 'zod';
import {
  MIN_PAGE,
  DEFAULT_PAGE,
  MIN_LIMIT,
  MAX_LIMIT,
  DEFAULT_LIMIT,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_FILE_SIZE,
  MIN_DURATION,
  MAX_DURATION,
} from './consts';

export const challengeFiltersSchema = z.object({
  search: z.string().trim().optional(),
  creatorName: z.string().trim().optional(),
  category: z.enum(FitnessCategory).optional(),
  difficulty: z.enum(ChallengeDifficulty).optional(),
  page: z.coerce.number().int().min(MIN_PAGE).default(DEFAULT_PAGE),
  limit: z.coerce.number().int().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  isPublished: z.boolean(),
});

export const editChallengeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(MIN_TITLE_LENGTH, `Минимум символов: ${MIN_TITLE_LENGTH}`)
    .max(MAX_TITLE_LENGTH, `Максимум символов: ${MAX_TITLE_LENGTH}`),
  description: z
    .string()
    .trim()
    .min(MIN_TITLE_LENGTH, `Минимум символов: ${MIN_DESCRIPTION_LENGTH}`)
    .max(MAX_TITLE_LENGTH, `Максимум символов: ${MAX_DESCRIPTION_LENGTH}`),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `Максимальный размер файла — ${MAX_FILE_SIZE / 1024 / 1024} МБ`,
    })
    .nullish(),
  category: z.array(z.enum(FitnessCategory)).default([]).optional(),
  difficulty: z.enum(ChallengeDifficulty),
  duration: z.coerce
    .number()
    .min(MIN_DURATION, `Минимальная длительность в днях: ${MIN_DURATION}`)
    .max(MAX_DURATION, `Максимальная длительность в днях: ${MAX_DURATION}`),
});
