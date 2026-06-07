import type { Challenge } from '@/shared/client';
import type { TChallengeDetailDto, TChallengeDto, TChallengeMutationDto, TMyChallengeDto } from '../model/dtos';
import type { TChallengeWithCreator, TProfileChallengeWithChallenge } from '../model/types';

export const mapChallengeToDto = (data: TChallengeWithCreator): TChallengeDto => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    category: data.category,
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

export const mapMyChallengeToDto = (data: TProfileChallengeWithChallenge): TMyChallengeDto => {
  return {
    id: data.id,
    status: data.status,
    currentDay: data.currentDay,
    challenge: {
      title: data.challenge.title,
      coverImageUrl: data.challenge.coverImageUrl,
      durationDays: data.challenge.durationDays,
    },
    percentage: Math.round((data.currentDay * 100) / data.challenge.durationDays),
  };
};

export const mapChallengeDetailToDto = (data: TChallengeWithCreator): TChallengeDetailDto => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    category: data.category,
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
}

export const mapChallengeMutationToDto = (data: Challenge): TChallengeMutationDto => {
  return {
    id: data.id,
    title: data.title,
  };
};
