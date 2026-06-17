import type { ProfileChallengeStatus } from '@/shared/types';

export type TProfileChallengeDto = {
  id: string;
  status: ProfileChallengeStatus;
  currentDay: number;
  challenge: {
    title: string;
    coverImageUrl: string | null;
    durationDays: number;
  };
  percentage: number;
};

export type TProfileChallengeMutationDto = {
  id: string;
  challenge: {
    title: string;
  };
};
