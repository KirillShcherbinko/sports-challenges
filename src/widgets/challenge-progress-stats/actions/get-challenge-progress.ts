'use server';

import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import { actionClient } from '@/shared/actions';
import { cacheLife, cacheTag } from 'next/cache';
import { retryResult } from '@/shared';
import { z } from 'zod';
import type { TChallengeProgressDto } from '@/entities/profile-challenge';

const getChallengeProgressSchema = z.object({
  challengeId: z.string(),
  profileId: z.string(),
});

const getCachedChallengeProgress = async (
  challengeId: string,
  profileId: string
): Promise<TChallengeProgressDto> => {
  'use cache';
  cacheTag(`challenge_progress_${challengeId}_${profileId}`);
  cacheLife('hours');

  return await retryResult(() => profileChallengeRepository.getChallengeProgress(challengeId, profileId));
};

export const getChallengeProgressAction = actionClient
  .inputSchema(getChallengeProgressSchema)
  .action(async ({ parsedInput: { challengeId, profileId } }): Promise<TChallengeProgressDto> => {
    return await getCachedChallengeProgress(challengeId, profileId);
  });
