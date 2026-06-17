import { FitnessLevel } from '@/shared/generated/prisma/enums';

export const FITNESS_LEVEL_LABELS: Record<FitnessLevel, string> = {
  [FitnessLevel.Beginner]: 'Новичок',
  [FitnessLevel.Intermediate]: 'Средний',
  [FitnessLevel.Advanced]: 'Продвинутый',
};
