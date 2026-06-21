'use server';

import { getUser } from '@/entities/auth/server';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const deleteCommentAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<void> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    await challengeCommentRepository.deleteChallengeComment(challengeId, user.id);

    revalidatePath(ERoutes.CHALLENGES);
  });
