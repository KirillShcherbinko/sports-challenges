import type { Challenge } from '@/shared/client';
import type { TChallengeDetailDto, TChallengeDto, TChallengeMutationDto, TEditChallengeDto } from '../model/dtos';
import type { TChallengeWithCreator } from '../model/types';

export const mapChallengeToDto = (data: TChallengeWithCreator): TChallengeDto => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    categories: data.categories,
    difficulty: data.difficulty,
    coverImageUrl: data.coverImageUrl,
    likesCount: data.likesCount,
    participantsCount: data.participantsCount,
    creator: {
      username: data.creator.username,
      avatarUrl: data.creator.avatarUrl,
    },
  };
};

export const mapChallengeDetailToDto = (data: TChallengeWithCreator): TChallengeDetailDto => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    categories: data.categories,
    difficulty: data.difficulty,
    coverImageUrl: data.coverImageUrl,
    likesCount: data.likesCount,
    participantsCount: data.participantsCount,
    durationDays: data.durationDays,
    creator: {
      username: data.creator.username,
      avatarUrl: data.creator.avatarUrl,
      fitnessLevel: data.creator.fitnessLevel,
    },
  };
};

export const mapChallengeMutationToDto = (data: Challenge): TChallengeMutationDto => {
  return {
    id: data.id,
    title: data.title,
  };
};

export const mapEditChallengeToDto = (data: Challenge): TEditChallengeDto => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    categories: data.categories,
    coverImageUrl: data.coverImageUrl,
    coverImagePath: data.coverImagePath,
    durationDays: data.durationDays,
  };
};
