import { retryResult } from '@/shared';
import { profileRepository } from '@/entities/profile';

import { unstable_cache } from 'next/cache';

export const getCachedProfileByUsername = (username: string) =>
  unstable_cache(
    async () => {
      return retryResult(() => profileRepository.getProfileByUsername(username));
    },

    ['profile', username],

    {
      revalidate: 60,
      tags: ['profile'],
    }
  )();
