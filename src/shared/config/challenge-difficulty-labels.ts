import { ChallengeDifficulty } from '@/shared/generated/prisma/enums';

export const CHALLENGE_DIFFICULTY_LABELS: Record<ChallengeDifficulty, string> = {
  [ChallengeDifficulty.Easy]: 'Лёгкий',
  [ChallengeDifficulty.Medium]: 'Средний',
  [ChallengeDifficulty.Hard]: 'Сложный',
};
