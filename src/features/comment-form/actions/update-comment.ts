'use server';

import { getUser } from '@/entities/auth/server';
import { challengeCommentSchemaWithChallengeId } from '@/entities/challenge-comment';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import { ERoutes } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const updateCommentAction = actionClient
  .inputSchema(challengeCommentSchemaWithChallengeId)
  .action(async ({ parsedInput }): Promise<void> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    const { challengeId, content } = parsedInput;
    await challengeCommentRepository.updateChallengeComment(challengeId, user.id, { content });

    revalidatePath(ERoutes.CHALLENGES);
  });
