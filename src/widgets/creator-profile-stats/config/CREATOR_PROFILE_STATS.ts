import { IconPercentage, IconStars } from '@tabler/icons-react';

export const CREATOR_PROFILE_STATS = [
  { icon: IconStars, label: 'Челленджей', color: 'var(--mantine-color-white)', iconColor: 'var(--mantine-color-white)', key: 'challengesCount' as const },
  { icon: IconPercentage, label: 'Сред. завершение', color: 'var(--mantine-color-success-5)', iconColor: 'var(--mantine-color-success-5)', key: 'avgCompletionRate' as const },
] as const;
