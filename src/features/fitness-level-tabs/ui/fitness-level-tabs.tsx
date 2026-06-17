'use client';

import { Tabs } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FitnessLevel } from '@/shared/generated/prisma/enums';
import { FITNESS_LEVEL_LABELS } from '@/shared';

export const FitnessLevelTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get('fitnessLevel');

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set('fitnessLevel', value);
    } else {
      params.delete('fitnessLevel');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs value={currentValue} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab value="all">Все</Tabs.Tab>
        {Object.values(FitnessLevel).map((level) => (
          <Tabs.Tab key={level} value={level}>
            {FITNESS_LEVEL_LABELS[level]}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
