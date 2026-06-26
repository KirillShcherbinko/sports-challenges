import type {
  ChallengeDifficulty,
  FitnessCategory,
  ProfileChallengeGetPayload,
  ProfileChallengeStatus,
} from '@/shared/types';

export type TProfileChallengeWithChallenge = ProfileChallengeGetPayload<{
  include: { challenge: true };
}>;

export type TProfileChallengesFilters = {
  search?: string;
  status?: ProfileChallengeStatus;
  category?: FitnessCategory;
  difficulty?: ChallengeDifficulty;
  page: number;
  limit: number;
};
