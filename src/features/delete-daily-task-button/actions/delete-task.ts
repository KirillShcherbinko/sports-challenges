'use server';

import { getUser } from '@/entities/auth/server';
import { challengeRepository } from '@/entities/challenge/server';
import { dailyTaskRepository } from '@/entities/daily-task/server';
import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const deleteTaskAction = actionClient.inputSchema(idSchema).action(async ({ parsedInput: challengeId }) => {
  const supabase = await createServer();
  const user = await getUser(supabase);

  const challenge = await challengeRepository.getChallengeById(challengeId);
  if (!challenge) {
    throw new Error('Челлендж не найден');
  }

  if (challenge.participantsCount > 0) {
    throw new Error('Нельзя удалять задания из челленджа, в котором есть участники');
  }

  const profileChallenge = await profileChallengeRepository.getProfileChallengeById(challengeId, user.id);
  if (!profileChallenge) {
    throw new Error('Вы не приступали к выполнению этого челленджа');
  }

  const dailyTask = await dailyTaskRepository.deleteDailyTask(challengeId, profileChallenge.currentDay);

  revalidatePath(ERoutes.MY_CHALLENGES);

  return dailyTask;
});
