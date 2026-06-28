'use server';

import { getUser } from '@/entities/auth/server';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import { challengeCommentSchemaWithCommentId } from '@/entities/challenge-comment';
import { ERoutes } from '@/shared';
import { actionClient } from '@/shared/actions';
import { assertCommentOwner } from '@/shared/lib/auth/authorize';
import { createServer } from '@/shared/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const updateCommentAction = actionClient
  .inputSchema(challengeCommentSchemaWithCommentId)
  .action(async ({ parsedInput }): Promise<void> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    const { commentId, content } = parsedInput;

    const comment = await challengeCommentRepository.getChallengeCommentById(commentId);

    await assertCommentOwner(commentId, user.id);

    await challengeCommentRepository.updateChallengeComment(commentId, { content });

    if (comment) {
      revalidatePath(`${ERoutes.CHALLENGES}/${comment.challengeId}`);
      revalidateTag(`comments_${comment.challengeId}`, 'default');
    }
  });
