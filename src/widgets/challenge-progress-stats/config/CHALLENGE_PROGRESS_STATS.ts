import { IconCalendarCheck, IconCalendarX, IconFlame, IconPercentage } from '@tabler/icons-react';

export const CHALLENGE_PROGRESS_STATS = [
  { icon: IconCalendarCheck, label: 'Дней завершено', color: 'var(--mantine-color-success-5)', iconColor: 'var(--mantine-color-success-5)', key: 'daysCompleted' as const },
  { icon: IconCalendarX, label: 'Дней пропущено', color: 'var(--mantine-color-red-5)', iconColor: 'var(--mantine-color-red-5)', key: 'daysMissed' as const },
  { icon: IconFlame, label: 'Текущая серия', color: 'var(--mantine-color-yellow-5)', iconColor: 'var(--mantine-color-yellow-5)', key: 'currentStreak' as const },
  { icon: IconPercentage, label: 'Процент выполнения', color: 'var(--mantine-color-brand-4)', iconColor: 'var(--mantine-color-brand-4)', key: 'completionPercentage' as const },
] as const;
