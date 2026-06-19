import { getUser } from '@/entities/auth/server';
import { editChallengeSchema } from '@/entities/challenge';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import type { ChallengeUpdateInput } from '@/shared/types';
import { uploadCoverImage } from './upload-cover-image';
import { ERoutes } from '@/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { challengeRepository } from '@/entities/challenge/server';
import { dailyTaskRepository } from '@/entities/daily-task/server';

export const updateChallengeAction = actionClient.inputSchema(editChallengeSchema).action(async ({ parsedInput }) => {
  const supabase = await createServer();
  await getUser(supabase);

  const { id, title, description, coverImage, difficulty, categories, durationDays } = parsedInput;
  const dailyTaskCount = await dailyTaskRepository.countDailyTasks(id);

  if (dailyTaskCount !== durationDays) {
    throw new Error('Количество заданий должно совпадать с длительностью челленджа');
  }

  const updatedData: ChallengeUpdateInput = { title, description, difficulty, categories, durationDays };

  if (coverImage && coverImage.size > 0) {
    const { coverImageUrl, coverImagePath } = await uploadCoverImage({ supabase, coverImage, challengeId: id });
    updatedData.coverImageUrl = coverImageUrl;
    updatedData.coverImagePath = coverImagePath;
  }

  await challengeRepository.updateChallenge(id, updatedData);

  revalidatePath(ERoutes.CHALLENGES);
  revalidatePath(ERoutes.MY_CHALLENGES);
  revalidatePath(ERoutes.DISCOVER);

  redirect(ERoutes.MY_CHALLENGES);
});
