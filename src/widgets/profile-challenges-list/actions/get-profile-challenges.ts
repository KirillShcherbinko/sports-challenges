'use server';

import { z } from 'zod';
import { retryResult, type TGetPaginatedResponseDto } from '@/shared';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { ProfileChallengeStatus, ChallengeDifficulty, FitnessCategory } from '@/shared/types';
import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/entities/profile-challenge/model/consts';
import type { TProfileChallengeDto } from '@/entities/profile-challenge/model/dtos';

const getProfileChallengesSchema = z.object({
  creatorName: z.string(),
  search: z.string().trim().optional(),
  status: z.enum(ProfileChallengeStatus).optional(),
  category: z.enum(FitnessCategory).optional(),
  difficulty: z.enum(ChallengeDifficulty).optional(),
  page: z.coerce.number().int().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().int().min(1).max(50).default(DEFAULT_LIMIT),
});

const getCachedProfileChallenges = async (
  creatorName: string,
  filters: z.infer<typeof getProfileChallengesSchema>
): Promise<TGetPaginatedResponseDto<TProfileChallengeDto>> => {
  'use cache';
  cacheTag(`profile_challenges_${creatorName}_${Object.values(filters).join('_')}`);
  cacheLife('hours');

  return await retryResult(() => profileChallengeRepository.getProfileChallenges(creatorName, filters));
};

export const getProfileChallengesAction = actionClient
  .inputSchema(getProfileChallengesSchema)
  .action(async ({ parsedInput }): Promise<TGetPaginatedResponseDto<TProfileChallengeDto>> => {
    const { creatorName, ...filters } = parsedInput;
    return await getCachedProfileChallenges(creatorName, filters);
  });
