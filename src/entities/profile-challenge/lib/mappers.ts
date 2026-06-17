import type { TProfileChallengeDto, TProfileChallengeMutationDto } from '../model/dtos';
import type { TProfileChallengeWithChallenge } from '../model/types';

export const mapProfileChallengeToDto = (data: TProfileChallengeWithChallenge): TProfileChallengeDto => {
  return {
    id: `${data.profileId}_${data.challengeId}`,
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

export const mapProfileChallengeMutationToDto = (
  data: TProfileChallengeWithChallenge
): TProfileChallengeMutationDto => {
  return {
    id: `${data.challengeId}_${data.profileId}`,
    challenge: {
      title: data.challenge.title,
    },
  };
};
