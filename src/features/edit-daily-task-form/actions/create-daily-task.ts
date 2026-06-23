'use server';

import { getUser } from '@/entities/auth/server';
import { challengeRepository } from '@/entities/challenge/server';
import { dailyTaskSchemaWithIds } from '@/entities/daily-task';
import type { TDailyTaskMutationDto } from '@/entities/daily-task/model/dtos';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import { ERoutes } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const createDailyTaskAction = actionClient
  .inputSchema(dailyTaskSchemaWithIds)
  .action(async ({ parsedInput }): Promise<TDailyTaskMutationDto> => {
    const supabase = await createServer();
    await getUser(supabase);

    const { challengeId, title, description, exerciseType } = parsedInput;
    const challenge = await challengeRepository.getChallengeById(challengeId);
    if (!challenge) {
      throw new Error('Челлендж не найден');
    }

    const dailyTask = await dailyTaskRepository.createDailyTask({
      challenge: { connect: { id: challengeId } },
      title,
      description,
      exerciseType,
      dayNumber: challenge.durationDays + 1,
    });

    await challengeRepository.updateChallenge(challengeId, { durationDays: { increment: 1 } });

    revalidatePath(ERoutes.MY_CHALLENGES);

    return dailyTask;
  });
