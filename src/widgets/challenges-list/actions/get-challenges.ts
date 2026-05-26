'use server';

import { challengeRepository } from '@/entities/challenge/server';
import type { TChallengeFilters } from '@/entities/challenge/model/types';

export const getChallenges = async (filters?: TChallengeFilters) => {
  return challengeRepository.getChallenges(filters);
};
