import type { FitnessCategory, ChallengeDifficulty, FitnessLevel } from '@/shared/types';

export type TChallengeDto = {
  id: string;
  title: string;
  description: string;
  category: FitnessCategory;
  difficulty: ChallengeDifficulty;
  coverImageUrl: string | null;
  likesCount: number;
  participantsCount: number;
  creator: {
    username: string;
    avatarUrl: string | null;
  };
};

export type TChallengeDetailDto = TChallengeDto & {
  durationDays: number;
  creator: {
    username: string;
    avatarUrl: string | null;
    fitnessLevel: FitnessLevel;
  };
};

export type TChallengeMutationDto = {
  id: string;
  title: string;
};
