'use server';

import { retryResult, type TGetPaginatedResponseDto } from '@/shared';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeRepository } from '@/entities/challenge/server';
import { challengeFiltersSchema, type TChallengeDto, type TChallengeFilters } from '@/entities/challenge';
import { getUser } from '@/entities/auth/server';
import { createServer } from '@/shared/server';
import { profileRepository } from '@/entities/profile/server';
import type { FitnessCategory, FitnessLevel } from '@/shared/types';

const getCachedChallenges = async (
  filters: TChallengeFilters,
  creatorName?: string,
  isPublished?: boolean,
  personalize?: boolean,
  userId?: string
): Promise<TGetPaginatedResponseDto<TChallengeDto>> => {
  'use cache';
  cacheTag(
    `challenges_${Object.values(filters).join('_')}${creatorName && `_${creatorName}`}${!!isPublished && `_${isPublished}`}${personalize && userId ? `_p_${userId}` : ''}`
  );
  cacheLife('hours');

  let userPreferences: FitnessCategory[];
  let userFitnessLevel: FitnessLevel;

  if (personalize && userId) {
    const profile = await profileRepository.getProfileById(userId);
    if (profile) {
      userPreferences = profile.preferences;
      userFitnessLevel = profile.fitnessLevel;
    }
  }

  return await retryResult(() =>
    challengeRepository.getChallenges(filters, creatorName, isPublished, personalize, userPreferences, userFitnessLevel)
  );
};

export const getChallengesAction = actionClient
  .inputSchema(challengeFiltersSchema)
  .action(async ({ parsedInput }): Promise<TGetPaginatedResponseDto<TChallengeDto>> => {
    const { personalize: requestedPersonalize, useCurrentUser, isPublished, ...filters } = parsedInput;

    let userId: string | undefined;
    let creatorName: string | undefined = filters.creatorName;

    try {
      const supabase = await createServer();
      const user = await getUser(supabase);
      userId = user.id;

      if (useCurrentUser && !creatorName) {
        const profile = await profileRepository.getProfileById(user.id);
        creatorName = profile?.username;
      }
    } catch {
      userId = undefined;
    }

    const personalize = requestedPersonalize && !!userId;

    return await getCachedChallenges(filters, creatorName, isPublished, personalize, userId);
  });
