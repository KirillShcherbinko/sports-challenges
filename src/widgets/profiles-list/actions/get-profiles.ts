'use server';

import { type TProfileFilters, type TProfilesData, profileFiltersSchema } from '@/entities/profile';
import { retryResult } from '@/shared';
import { profileRepository } from '@/entities/profile/server';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';

const getCachedProfiles = async (filters: TProfileFilters): Promise<TProfilesData> => {
  'use cache';
  cacheTag('profile');
  cacheLife('hours');

  return await retryResult(() => profileRepository.getProfiles(filters));
};

export const getProfilesAction = actionClient
  .inputSchema(profileFiltersSchema)
  .action(async ({ parsedInput }): Promise<TProfilesData> => {
    return await getCachedProfiles(parsedInput);
  });
