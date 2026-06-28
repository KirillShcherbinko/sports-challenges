'use server';

import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import type { TEditChallengeCommentDto } from '@/entities/challenge-comment';
import { idSchema, retryResult } from '@/shared';

const getCachedCommentData = async (commentId: string): Promise<TEditChallengeCommentDto> => {
  'use cache';
  cacheTag(`comment edit ${commentId}`);
  cacheLife('hours');

  const comment = await retryResult(() => challengeCommentRepository.getChallengeCommentById(commentId));

  if (!comment) {
    throw new Error('Комментарий не найден');
  }

  return {
    content: comment.content,
  };
};

export const getEditCommentFormDataAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: commentId }): Promise<TEditChallengeCommentDto> => {
    return await getCachedCommentData(commentId);
  });
