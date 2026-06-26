import { z } from 'zod';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_BIO_LENGTH,
  MAX_FILE_SIZE,
  MAX_LIMIT,
  MAX_USERNAME_LENGTH,
  MIN_LIMIT,
  MIN_PAGE,
  MIN_USERNAME_LENGTH,
} from './consts';
import { FitnessCategory, FitnessLevel } from '@/shared/types';

export const usernameSchema = z
  .string()
  .nonempty('Имя пользователя обязателено')
  .min(MIN_USERNAME_LENGTH, `Минимальная длина имени: ${MIN_USERNAME_LENGTH}`)
  .max(MAX_USERNAME_LENGTH, `Максимальная длина имени: ${MAX_USERNAME_LENGTH}`);

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
    .min(MIN_USERNAME_LENGTH, `Минимум символов: ${MIN_USERNAME_LENGTH}`)
    .max(MAX_USERNAME_LENGTH, `Максимум символов: ${MAX_USERNAME_LENGTH}`),
  bio: z.string().trim().max(MAX_BIO_LENGTH, `Максимум символов: ${MAX_BIO_LENGTH}`).nullish(),
  preferences: z.array(z.enum(FitnessCategory)).default([]).optional(),
  fitnessLevel: z.enum(FitnessLevel),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `Максимальный размер файла — ${MAX_FILE_SIZE / 1024 / 1024} МБ`,
    })
    .nullish(),
});
