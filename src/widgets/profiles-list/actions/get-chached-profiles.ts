import { retryResult } from '@/shared';
import { profileRepository } from '@/entities/profile/server';
import type { TProfileFilters } from '@/entities/profile/model/types';

import { unstable_cache } from 'next/cache';

export const getCachedProfiles = (filters: TProfileFilters) =>
  unstable_cache(
    async () => {
      return retryResult(() => profileRepository.getProfiles(filters));
    },

    ['profiles', filters.search ?? '', filters.fitnessLevel ?? '', String(filters.page), String(filters.limit)],

    {
      revalidate: 60,
      tags: ['profiles'],
    }
  )();
