import { FitnessLevel } from '../types';
import { FITNESS_LEVEL_LABELS } from './fitness-level-labels';

const fitnessLevels: FitnessLevel[] = [FitnessLevel.Beginner, FitnessLevel.Intermediate, FitnessLevel.Advanced];

export const FITNESS_LEVEL_DATA = fitnessLevels.map((level) => ({
  value: level,
  label: FITNESS_LEVEL_LABELS[level],
}));
