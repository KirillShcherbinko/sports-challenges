import type { FitnessCategory, ChallengeDifficulty } from '@/shared/client';
import type { ChallengeGetPayload } from '@/shared/types';

export type TChallengeWithCreator = ChallengeGetPayload<{
  include: { creator: true };
}>;

export type TChallengesFilters = {
  search?: string;
  creatorName?: string;
  category?: FitnessCategory;
  difficulty?: ChallengeDifficulty;
  page: number;
  limit: number;
  isPublished: boolean;
};
