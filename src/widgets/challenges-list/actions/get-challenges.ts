'use server';

import { retryResult, type TGetPaginatedResponseDto } from '@/shared';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeRepository } from '@/entities/challenge/server';
import { challengeFiltersSchema, type TChallengeDto, type TChallengeFilters } from '@/entities/challenge';

const getCachedChallenges = async (
  filters: TChallengeFilters,
  creatorName?: string,
  isPublished?: boolean
): Promise<TGetPaginatedResponseDto<TChallengeDto>> => {
  'use cache';
  cacheTag(
    `challenges_${Object.values(filters).join('_')}${creatorName && `_${creatorName}`}${!!isPublished && `_${isPublished}`}`
  );
  cacheLife('hours');

  return await retryResult(() => challengeRepository.getChallenges(filters, creatorName, isPublished));
};

export const getChallengesAction = actionClient
  .inputSchema(challengeFiltersSchema)
  .action(async ({ parsedInput }): Promise<TGetPaginatedResponseDto<TChallengeDto>> => {
    return await getCachedChallenges(parsedInput);
  });
