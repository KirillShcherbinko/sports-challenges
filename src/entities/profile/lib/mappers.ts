import type { Profile } from '@/shared/client';
import type { TProfileDetailDto, TProfileDto, TEditProfileDto, TProfileMutationDto } from '../model/dtos';

export const mapProfileToDto = (data: Profile): TProfileDto => {
  return {
    id: data.id,
    username: data.username,
    avatarUrl: data.avatarUrl,
    fitnessLevel: data.fitnessLevel,
  };
};

export const mapProfileDetailToDto = (data: Profile): TProfileDetailDto => {
  return {
    id: data.id,
    username: data.username,
    avatarUrl: data.avatarUrl,
    fitnessLevel: data.fitnessLevel,
    bio: data.bio,
    preferences: data.preferences,
    streakCount: data.streakCount,
    totalCompletedTasks: data.totalCompletedTasks,
  };
};

export const mapEditProfileToDto = (data: Profile): TEditProfileDto => {
  return {
    id: data.id,
    username: data.username,
    avatarUrl: data.avatarUrl,
    fitnessLevel: data.fitnessLevel,
    bio: data.bio,
    preferences: data.preferences,
  };
};

export const mapProfileMutationToDto = (data: Pick<Profile, 'id'>): TProfileMutationDto => {
  return {
    id: data.id,
  };
};
