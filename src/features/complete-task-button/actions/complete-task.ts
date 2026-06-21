'use server';

import { getUser } from '@/entities/auth/server';
import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import type { TTaskCompletionMutationDto } from '@/entities/task-completion';
import { taskCompletionRepository } from '@/entities/task-completion/server';
import { ERoutes, idSchema, isOlderThan24Hours } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const completeTaskAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<TTaskCompletionMutationDto> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    const profileChallenge = await profileChallengeRepository.getProfileChallengeById(challengeId, user.id);
    if (!profileChallenge) {
      throw new Error('Вы не начали выполнение этого челленджа');
    }

    if (!isOlderThan24Hours(profileChallenge.updatedAt)) {
      throw new Error('Нельзя выполнять более 1-го челленджа в день');
    }

    const taskCompletion = await taskCompletionRepository.completeTask(
      challengeId,
      user.id,
      profileChallenge.currentDay
    );
    await profileChallengeRepository.updateProfileChallenge(challengeId, user.id, {
      currentDay: profileChallenge.currentDay + 1,
    });

    revalidatePath(ERoutes.CHALLENGES);
    revalidatePath(ERoutes.MY_CHALLENGES);

    return taskCompletion;
  });
