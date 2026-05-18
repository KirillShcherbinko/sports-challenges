import { retryResult } from '@/shared';
import { profileRepository } from '@/entities/profile/server';

import { unstable_cache } from 'next/cache';

export const getCachedProfileById = (profileId: string) =>
  unstable_cache(
    async () => {
      return retryResult(() => profileRepository.getProfileById(profileId));
    },

    ['profile', profileId],

    {
      revalidate: 60,
      tags: ['profile'],
    }
  )();
