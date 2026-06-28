import type { ProfileChallengeStatus } from '@/shared/types';

export type TProfileChallengeDto = {
  id: string;
  challengeId: string;
  status: ProfileChallengeStatus;
  currentDay: number;
  challenge: {
    title: string;
    coverImageUrl: string | null;
    durationDays: number;
  };
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TProfileChallengeMutationDto = {
  id: string;
  challenge: {
    title: string;
  };
};

export type TChallengeProgressDto = {
  daysCompleted: number;
  daysMissed: number;
  currentStreak: number;
  completionPercentage: number;
};
