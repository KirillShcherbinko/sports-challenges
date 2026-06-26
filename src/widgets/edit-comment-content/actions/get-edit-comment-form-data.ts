'use server';

import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import type { TEditChallengeCommentDto } from '@/entities/challenge-comment';
import { getUser } from '@/entities/auth/server';
import { createServer } from '@/shared/server';
import { idSchema, retryResult } from '@/shared';

const getCachedCommentData = async (challengeId: string, profileId: string): Promise<TEditChallengeCommentDto> => {
  'use cache';
  cacheTag(`comment edit ${challengeId}_${profileId}`);
  cacheLife('hours');

  const comment = await retryResult(() => challengeCommentRepository.getChallengeCommentById(challengeId, profileId));

  if (!comment) {
    throw new Error('Комментарий не найден');
  }

  return {
    content: comment.content,
  };
};

export const getEditCommentFormDataAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<TEditChallengeCommentDto> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    return await getCachedCommentData(challengeId, user.id);
  });
