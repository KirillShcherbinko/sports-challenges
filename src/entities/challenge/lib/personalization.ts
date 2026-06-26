import type { FitnessCategory, ChallengeDifficulty, FitnessLevel } from '@/shared/types';
import type { TChallengeDto } from '../model/dtos';

const DIFFICULTY_LEVEL_MAP: Record<ChallengeDifficulty, FitnessLevel> = {
  Easy: 'Beginner',
  Medium: 'Intermediate',
  Hard: 'Advanced',
};

const CATEGORY_MATCH_WEIGHT = 1;
const DIFFICULTY_MATCH_WEIGHT = 2;

const countCategoryMatches = (challengeCategories: FitnessCategory[], userPreferences: FitnessCategory[]): number => {
  return challengeCategories.filter((cat) => userPreferences.includes(cat)).length;
};

const isDifficultyMatch = (challengeDifficulty: ChallengeDifficulty, userLevel: FitnessLevel): boolean => {
  return DIFFICULTY_LEVEL_MAP[challengeDifficulty] === userLevel;
};

export const calculatePersonalizationScore = (
  challenge: TChallengeDto,
  userPreferences: FitnessCategory[],
  userFitnessLevel: FitnessLevel,
): number => {
  const categoryScore = countCategoryMatches(challenge.categories, userPreferences) * CATEGORY_MATCH_WEIGHT;
  const difficultyScore = isDifficultyMatch(challenge.difficulty, userFitnessLevel) ? DIFFICULTY_MATCH_WEIGHT : 0;

  return categoryScore + difficultyScore;
};

export const sortByPersonalization = (
  challenges: TChallengeDto[],
  userPreferences: FitnessCategory[],
  userFitnessLevel: FitnessLevel
): TChallengeDto[] => {
  return [...challenges].sort((a, b) => {
    const scoreA = calculatePersonalizationScore(a, userPreferences, userFitnessLevel);
    const scoreB = calculatePersonalizationScore(b, userPreferences, userFitnessLevel);

    return scoreB - scoreA;
  });
};
