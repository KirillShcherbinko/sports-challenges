'use client';

import { Tabs } from '@mantine/core';
import { FITNESS_LEVEL_LABELS } from '@/shared';
import { FitnessLevel } from '@/shared/types';
import { useFitnessLevelFilter } from '../lib/use-fitness-level-filter';

export const FitnessLevelTabs = () => {
  const { fitnessLevelValue, handleChange } = useFitnessLevelFilter();

  return (
    <Tabs value={fitnessLevelValue} onChange={handleChange}>
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
