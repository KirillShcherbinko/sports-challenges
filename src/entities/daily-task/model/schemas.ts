import { z } from 'zod';
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MIN_DESCRIPTION_LENGTH, MIN_TITLE_LENGTH } from './consts';
import { FitnessCategory } from '@/shared/types';
import { idSchema } from '@/shared';

export const dailyTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(MIN_TITLE_LENGTH, `Минимум символов: ${MIN_TITLE_LENGTH}`)
    .max(MAX_TITLE_LENGTH, `Максимум символов: ${MAX_TITLE_LENGTH}`),
  description: z
    .string()
    .trim()
    .min(MIN_DESCRIPTION_LENGTH, `Минимум символов: ${MIN_DESCRIPTION_LENGTH}`)
    .max(MAX_DESCRIPTION_LENGTH, `Максимум символов: ${MAX_DESCRIPTION_LENGTH}`),
  exerciseType: z.enum(FitnessCategory),
});

const dayNumberSchema = z.number();

export const dailyTaskSchemaWithIds = dailyTaskSchema.extend({
  challengeId: idSchema,
  dayNumber: dayNumberSchema,
});

export const challengeIdAndDayNumberSchema = z.object({
  challengeId: idSchema,
  dayNumber: dayNumberSchema,
});
