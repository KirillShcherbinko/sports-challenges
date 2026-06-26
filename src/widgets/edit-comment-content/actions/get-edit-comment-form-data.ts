'use server';

import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import { challengeCommentSchemaWithChallengeId } from '@/entities/challenge-comment';
import type { TEditChallengeCommentDto } from '@/entities/challenge-comment';
import { getUser } from '@/entities/auth/server';
import { createServer } from '@/shared/server';
import { retryResult } from '@/shared';

const getCachedCommentData = async (
  challengeId: string,
  profileId: string
): Promise<TEditChallengeCommentDto> => {
  'use cache';
  cacheTag(`comment edit ${challengeId}_${profileId}`);
  cacheLife('hours');

  const comment = await retryResult(() =>
    challengeCommentRepository.getChallengeCommentById(challengeId, profileId)
  );

  if (!comment) {
    throw new Error('Комментарий не найден');
  }

  return {
    content: comment.content,
  };
};

export const getEditCommentFormDataAction = actionClient
  .inputSchema(challengeCommentSchemaWithChallengeId)
  .action(async ({ parsedInput }): Promise<TEditChallengeCommentDto> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    return await getCachedCommentData(parsedInput.challengeId, user.id);
  });
