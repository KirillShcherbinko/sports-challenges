'use server';

import { z } from 'zod';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { taskCompletionRepository } from '@/entities/task-completion/server';
import type { TTaskCompletionDto } from '@/entities/task-completion';
import { getUser } from '@/entities/auth/server';
import { createServer } from '@/shared/server';

const getTaskCompletionsSchema = z.object({
  challengeId: z.string(),
});

const getCachedTaskCompletions = async (challengeId: string, profileId: string): Promise<TTaskCompletionDto[]> => {
  'use cache';
  cacheTag(`task_completions_${challengeId}_${profileId}`);
  cacheLife('hours');

  return await taskCompletionRepository.getTaskCompletionHistory(challengeId, profileId);
};

export const getTaskCompletionsAction = actionClient
  .inputSchema(getTaskCompletionsSchema)
  .action(async ({ parsedInput }): Promise<TTaskCompletionDto[]> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    return await getCachedTaskCompletions(parsedInput.challengeId, user.id);
  });
