'use server';

import { z } from 'zod';
import { retryResult, type TGetPaginatedResponseDto } from '@/shared';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import type { TChallengeCommentDto } from '@/entities/challenge-comment';
import { DEFAULT_LIMIT } from '@/entities/challenge-comment/model/consts';

const getChallengeCommentsSchema = z.object({
  challengeId: z.string(),
  page: z.coerce.number().int().min(1).default(1),
});

const getComments = async (
  challengeId: string,
  page: number
): Promise<TGetPaginatedResponseDto<TChallengeCommentDto>> => {
  'use cache';
  cacheTag(`comments_${challengeId}`);
  cacheLife('minutes');

  return await retryResult(() =>
    challengeCommentRepository.getChallengeComments(challengeId, { page, limit: DEFAULT_LIMIT })
  );
};

export const getChallengeCommentsAction = actionClient
  .inputSchema(getChallengeCommentsSchema)
  .action(async ({ parsedInput }): Promise<TGetPaginatedResponseDto<TChallengeCommentDto>> => {
    return await getComments(parsedInput.challengeId, parsedInput.page);
  });
