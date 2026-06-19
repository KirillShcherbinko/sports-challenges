import type { FitnessCategory, FitnessLevel } from '@/shared/types';

export type TProfileDto = {
  id: string;
  username: string;
  avatarUrl: string | null;
  fitnessLevel: FitnessLevel;
};

export type TProfileDetailDto = TProfileDto & {
  bio: string | null;
  preferences: FitnessCategory[];
  streakCount: number;
  totalCompletedTasks: number;
};

export type TEditProfileDto = TProfileDto & {
  bio: string | null;
  preferences: FitnessCategory[];
  avatarPath: string | null;
};

export type TProfileMutationDto = {
  id: string;
};
