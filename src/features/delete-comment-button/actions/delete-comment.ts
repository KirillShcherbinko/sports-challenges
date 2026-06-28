'use server';

import { getUser } from '@/entities/auth/server';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { assertCommentOwner } from '@/shared/lib/auth/authorize';
import { createServer } from '@/shared/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const deleteCommentAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: commentId }): Promise<boolean> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    const comment = await challengeCommentRepository.getChallengeCommentById(commentId);

    await assertCommentOwner(commentId, user.id);

    await challengeCommentRepository.deleteChallengeComment(commentId);

    if (comment) {
      revalidatePath(`${ERoutes.CHALLENGES}/${comment.challengeId}`);
      revalidateTag(`comments_${comment.challengeId}`, 'default');
    }

    return true;
  });
