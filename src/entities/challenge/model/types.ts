import type { FitnessCategory, ChallengeDifficulty } from '@/shared/client';
import type { ChallengeGetPayload } from '@/shared/types';
import type { challengeFiltersSchema, editChallengeSchema } from './schemas';
import type z from 'zod';

export type TChallengeWithCreator = ChallengeGetPayload<{
  include: { creator: true };
}>;

export type TChallengeFilters = {
  search?: string;
  creatorName?: string;
  category?: FitnessCategory;
  difficulty?: ChallengeDifficulty;
  page: number;
  limit: number;
  isPublished: boolean;
};

export type TChallengeFiltersSchema = z.infer<typeof challengeFiltersSchema>;
export type TEditChallengeSchema = z.infer<typeof editChallengeSchema>;
