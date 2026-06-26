'use client';

import { Tabs } from '@mantine/core';
import { PROFILE_CHALLENGE_STATUS_LABELS } from '@/shared';
import { ProfileChallengeStatus } from '@/shared/types';
import { useChallengeStatusFilter } from '../lib/use-challenge-status-filter';

export const ChallengeStatusTabs = () => {
  const { statusValue, handleChange } = useChallengeStatusFilter();

  return (
    <Tabs value={statusValue} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab value="all">Все</Tabs.Tab>
        {Object.values(ProfileChallengeStatus).map((status) => (
          <Tabs.Tab key={status} value={status}>
            {PROFILE_CHALLENGE_STATUS_LABELS[status]}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
