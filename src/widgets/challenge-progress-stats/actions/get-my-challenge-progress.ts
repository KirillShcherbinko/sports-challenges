'use server';

import { getUser } from '@/entities/auth/server';
import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { cacheLife, cacheTag } from 'next/cache';
import { retryResult } from '@/shared';
import { z } from 'zod';
import type { TChallengeProgressDto } from '@/entities/profile-challenge';

const getMyChallengeProgressSchema = z.object({
  challengeId: z.string(),
});

const getCachedMyChallengeProgress = async (
  challengeId: string,
  profileId: string
): Promise<TChallengeProgressDto> => {
  'use cache';
  cacheTag(`my_challenge_progress_${challengeId}`);
  cacheLife('hours');

  return await retryResult(() => profileChallengeRepository.getChallengeProgress(challengeId, profileId));
};

export const getMyChallengeProgressAction = actionClient
  .inputSchema(getMyChallengeProgressSchema)
  .action(async ({ parsedInput: { challengeId } }): Promise<TChallengeProgressDto> => {
    const supabase = await createServer();
    const { id } = await getUser(supabase);

    return await getCachedMyChallengeProgress(challengeId, id);
  });
