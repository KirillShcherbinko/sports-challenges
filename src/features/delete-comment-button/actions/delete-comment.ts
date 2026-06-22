'use server';

import { getUser } from '@/entities/auth/server';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import { challengeExistsAndPublished } from '@/entities/challenge/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const deleteCommentAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<void> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    await challengeExistsAndPublished(challengeId);
    await challengeCommentRepository.deleteChallengeComment(challengeId, user.id);

    revalidatePath(ERoutes.CHALLENGES);
  });
