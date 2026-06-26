'use server';

import { actionClient } from '@/shared/actions';
import { cacheLife, cacheTag } from 'next/cache';
import { challengeRepository } from '@/entities/challenge/server';
import { idSchema } from '@/shared';

const getCachedChallengeTitle = async (challengeId: string) => {
  'use cache';
  cacheTag(`challenge_${challengeId}`);
  cacheLife('hours');

  return challengeRepository.getChallengeTitle(challengeId);
};

export const getChallengeTitleAction = actionClient.inputSchema(idSchema).action(async ({ parsedInput: challengeId }) => {
  return await getCachedChallengeTitle(challengeId);
});
