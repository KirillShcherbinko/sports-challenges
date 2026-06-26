'use server';

import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeRepository } from '@/entities/challenge/server';
import { idSchema } from '@/shared';
import type { TEditChallengeDto } from '@/entities/challenge';
import { retryResult } from '@/shared';

const getCachedChallengeData = async (challengeId: string): Promise<TEditChallengeDto> => {
  'use cache';
  cacheTag(`challenge edit ${challengeId}`);
  cacheLife('hours');

  const challenge = await retryResult(() => challengeRepository.getEditChallengeById(challengeId));

  if (!challenge) {
    throw new Error('Челлендж не найден');
  }

  return challenge;
};

export const getEditChallengeFormDataAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<TEditChallengeDto> => {
    return await getCachedChallengeData(challengeId);
  });
