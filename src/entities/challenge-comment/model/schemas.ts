import z from 'zod';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from './consts';
import { idSchema } from '@/shared';

export const challengeCommentSchema = z
  .string()
  .trim()
  .max(MAX_COMMENT_LENGTH, `Максимальное количество символов: ${MAX_COMMENT_LENGTH}`)
  .min(MIN_COMMENT_LENGTH, `Минимальное количество символов: ${MIN_COMMENT_LENGTH}`);

export const challengeCommentSchemaWithChallengeId = z.object({
  challengeId: idSchema,
  content: challengeCommentSchema,
});
