'use server';

import { actionClient } from '@/shared/actions';
import { cacheLife, cacheTag } from 'next/cache';
import { challengeRepository } from '@/entities/challenge/server';
import { idSchema } from '@/shared';
import { getUser } from '@/entities/auth/server';
import { createServer } from '@/shared/server';
import { profileRepository } from '@/entities/profile/server';

const getCachedChallenge = async (challengeId: string) => {
  'use cache';
  cacheTag(`challenge_${challengeId}`);
  cacheLife('hours');

  return challengeRepository.getChallengeById(challengeId);
};

export const getChallengeAction = actionClient.inputSchema(idSchema).action(async ({ parsedInput: challengeId }) => {
  const challenge = await getCachedChallenge(challengeId);

  if (!challenge) {
    throw new Error('Челлендж не найден');
  }

  let isOwner = false;
  try {
    const supabase = await createServer();
    const { id } = await getUser(supabase);
    const profile = await profileRepository.getProfileById(id);
    isOwner = profile !== null && profile.username === challenge.creator.username;
  } catch {
    isOwner = false;
  }

  return { challenge, isOwner };
});
