import type { ChallengeCategory, ChallengeDifficulty } from '@/shared/client';
import type { ChallengeGetPayload, ProfileChallengeGetPayload, ProfileChallengeStatus } from '@/shared/types';

export type TChallengeWithCreator = ChallengeGetPayload<{
  include: { creator: true };
}>;

export type TProfileChallengeWithChallenge = ProfileChallengeGetPayload<{
  include: { challenge: true };
}>

export type TChallengesFilters = {
  search?: string;
  creatorName?: string;
  category?: ChallengeCategory;
  difficulty?: ChallengeDifficulty;
  page: number;
  limit: number;
  isPublished: boolean;
};

export type TMyChallengesFilters = {
  search?: string;
  creatorName?: string;
  status?: ProfileChallengeStatus;
  category?: ChallengeCategory;
  difficulty?: ChallengeDifficulty; 
  page: number;
  limit: number;
}
