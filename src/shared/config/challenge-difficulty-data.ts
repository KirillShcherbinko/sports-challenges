import { ChallengeDifficulty } from '../types';
import { CHALLENGE_DIFFICULTY_LABELS } from './challenge-difficulty-labels';

const fitnessLevels: ChallengeDifficulty[] = [ChallengeDifficulty.Easy, ChallengeDifficulty.Medium, ChallengeDifficulty.Hard];

export const CHALLENGE_DIFFICULTY_DATA = fitnessLevels.map((difficulty) => ({
  value: difficulty,
  label: CHALLENGE_DIFFICULTY_LABELS[difficulty],
}));
