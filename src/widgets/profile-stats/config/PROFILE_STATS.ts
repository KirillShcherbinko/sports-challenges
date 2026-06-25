import { IconChecklist, IconFlag, IconStars } from '@tabler/icons-react';

export const PROFILE_STATS = [
  { icon: IconFlag, label: 'Челленджей пройдено', color: 'var(--mantine-color-white)', iconColor: 'var(--mantine-color-brand-4)', key: 'challengesCompleted' as const },
  { icon: IconChecklist, label: 'Завершено', color: 'var(--mantine-color-success-5)', iconColor: 'var(--mantine-color-success-5)', key: 'completedTasks' as const },
  { icon: IconStars, label: 'Создано', color: 'var(--mantine-color-yellow-5)', iconColor: 'var(--mantine-color-yellow-5)', key: 'createdChallenges' as const },
] as const;
