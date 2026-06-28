import { SearchInput } from '@/features/search-input';
import { DifficultyTabs } from '@/features/difficulty-tabs';
import { ChallengesList } from '@/widgets/challenges-list';
import { Button, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { ERoutes } from '@/shared';

type TMyChallengesPageProps = {
  searchParams: Record<string, string | undefined>;
};

export const MyChallengesPage = ({ searchParams }: TMyChallengesPageProps) => {
  return (
    <Stack maw={1200} w="100%" py={32} px={48} gap={24}>
      <Group justify="space-between" align="center">
        <Text fw={700} fz={28}>
          Мои челленджи
        </Text>
        <Link href={ERoutes.CREATE_CHALLENGE}>
          <Button leftSection={<IconPlus size={16} />}>Создать</Button>
        </Link>
      </Group>

      <Stack gap={12}>
        <DifficultyTabs />
        <SearchInput placeholder="Поиск челленджей" />
      </Stack>

      <ChallengesList searchParams={searchParams} useCurrentUser route={ERoutes.MY_CHALLENGES} />
    </Stack>
  );
};
