import type { TPaginationResponse } from '@/shared';
import type { ChallengeCategory, ChallengeDifficulty, FitnessLevel, ProfileChallengeStatus } from '@/shared/types';

export type TChallengeDto = {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  coverImageUrl: string | null;
  likesCount: number;
  participantsCount: number;
  creator: {
    username: string;
    avatarUrl: string | null;
  };
};

export type TMyChallengeDto = {
  id: string;
  status: ProfileChallengeStatus;
  currentDay: number;
  challenge: {
    title: string;
    coverImageUrl: string | null;
    durationDays: number;
  }
  percentage: number;
}

export type TChallengeDetailDto = TChallengeDto & {
  durationDays: number;
  creator: {
    username: string;
    avatarUrl: string | null;
    fitnessLevel: FitnessLevel;
  }
}

export type TChallengeMutationDto = {
  id: string;
  title: string;
};

export type TGetChallengesResponseDto<T> = {
  items: T[];
  pagination: TPaginationResponse
};


