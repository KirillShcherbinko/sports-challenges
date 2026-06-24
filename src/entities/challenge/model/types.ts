import type { FitnessCategory, ChallengeDifficulty } from '@/shared/client';
import type { ChallengeGetPayload } from '@/shared/types';
import type { challengeFiltersSchema, challengeSchema } from './schemas';
import type z from 'zod';

export type TChallengeWithCreator = ChallengeGetPayload<{
  include: { creator: true };
}>;

export type TChallengeFilters = {
  search?: string;
  categories?: FitnessCategory[];
  difficulty?: ChallengeDifficulty;
  page: number;
  limit: number;
};

export type TChallengeFiltersSchema = z.infer<typeof challengeFiltersSchema>;
export type TChallengeSchema = z.infer<typeof challengeSchema>;
