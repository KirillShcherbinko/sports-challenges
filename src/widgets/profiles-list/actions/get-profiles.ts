'use server';

import { type TProfileDto, type TProfileFilters, profileFiltersSchema } from '@/entities/profile';
import { retryResult, type TGetPaginatedResponseDto } from '@/shared';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';

const getCachedProfiles = async (filters: TProfileFilters): Promise<TGetPaginatedResponseDto<TProfileDto>> => {
  'use cache';
  cacheTag(`profiles_${Object.values(filters).join('_')}`);
  cacheLife('hours');

  return await retryResult(() => profileRepository.getProfiles(filters));
};

export const getProfilesAction = actionClient
  .inputSchema(profileFiltersSchema)
  .action(async ({ parsedInput }): Promise<TGetPaginatedResponseDto<TProfileDto>> => {
    return await getCachedProfiles(parsedInput);
  });
