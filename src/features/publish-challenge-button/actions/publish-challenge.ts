'use server';

import { getUser } from '@/entities/auth/server';
import { challengeExistsAndNotPublished, challengeRepository } from '@/entities/challenge/server';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const publishChallengeAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<void> => {
    const supabase = await createServer();
    await getUser(supabase);

    await challengeExistsAndNotPublished(challengeId);

    const dailyTasksCount = await dailyTaskRepository.countDailyTasks(challengeId);
    if (dailyTasksCount === 0) {
      throw new Error('Нельзя публиковать челлендж с нулевым количеством заданий');
    }

    await challengeRepository.updateChallenge(challengeId, { isPublished: true });

    revalidatePath(ERoutes.CHALLENGES);
    revalidatePath(ERoutes.MY_CHALLENGES);
    revalidatePath(ERoutes.DISCOVER);

    redirect(ERoutes.MY_CHALLENGES);
  });
