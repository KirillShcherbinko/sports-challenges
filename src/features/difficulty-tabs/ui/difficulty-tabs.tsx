'use client';

import { Tabs } from '@mantine/core';
import { CHALLENGE_DIFFICULTY_LABELS } from '@/shared';
import { ChallengeDifficulty } from '@/shared/types';
import { useDifficultyFilter } from '../lib/use-difficulty-filter';

export const DifficultyTabs = () => {
  const { difficultyValue, handleChange } = useDifficultyFilter();

  return (
    <Tabs value={difficultyValue} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab value="all">Все</Tabs.Tab>
        {Object.values(ChallengeDifficulty).map((difficulty) => (
          <Tabs.Tab key={difficulty} value={difficulty}>
            {CHALLENGE_DIFFICULTY_LABELS[difficulty]}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
