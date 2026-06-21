'use server';

import { getUser } from '@/entities/auth/server';
import { challengeRepository } from '@/entities/challenge/server';
import { dailyTaskSchemaWithDayNumber } from '@/entities/daily-task';
import type { TDailyTaskMutationDto } from '@/entities/daily-task/model/dtos';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import { ERoutes } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const createDailyTaskAction = actionClient
  .inputSchema(dailyTaskSchemaWithDayNumber)
  .action(async ({ parsedInput }): Promise<TDailyTaskMutationDto> => {
    const supabase = await createServer();
    await getUser(supabase);

    const { challengeId, dayNumber, ...updatedData } = parsedInput;
    const challenge = await challengeRepository.getChallengeById(challengeId);
    if (!challenge) {
      throw new Error('Челлендж не найден');
    }

    const dailyTask = await dailyTaskRepository.updateDailyTask(challengeId, dayNumber, {
      challenge: { connect: { id: challengeId } },
      ...updatedData,
    });

    revalidatePath(ERoutes.MY_CHALLENGES);

    return dailyTask;
  });
