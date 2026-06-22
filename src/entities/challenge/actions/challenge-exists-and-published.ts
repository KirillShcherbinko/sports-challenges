import type { TIsChallengePublishedDto } from '../model/dtos';
import { challengeRepository } from '../model/repository';

export const challengeExistsAndPublished = async (challengeId: string): Promise<TIsChallengePublishedDto> => {
  const challenge = await challengeRepository.isChallengePublished(challengeId);
  if (!challenge) {
    throw new Error('Челлендж не найден');
  }

  if (!challenge.isPublished) {
    throw new Error('Челлендж не опубликован');
  }

  return challenge;
};
