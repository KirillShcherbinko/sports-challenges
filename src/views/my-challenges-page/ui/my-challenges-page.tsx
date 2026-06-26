import { SearchInput } from '@/features/search-input';
import { ChallengesList } from '@/widgets/challenges-list';
import { getMyProfileAction } from '@/widgets/profile-info/actions/get-my-profile';
import { Button, Group, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { ERoutes } from '@/shared';
import type { TChallengeFilters } from '@/entities/challenge';

type TMyChallengesPageProps = {
  searchParams: Record<string, string | undefined>;
};

export const MyChallengesPage = async ({ searchParams }: TMyChallengesPageProps) => {
  const { data: profile } = await getMyProfileAction();

  const filters: TChallengeFilters = {
    search: searchParams.search,
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
  };

  return (
    <Stack maw={1200} w="100%" p={24} gap={24}>
      <Group justify="space-between" align="center">
        <Text fw={700} fz={28}>
          Мои челленджи
        </Text>
        <Button component={Link} href={ERoutes.CREATE_CHALLENGE} leftSection={<IconPlus size={16} />}>
          Создать
        </Button>
      </Group>

      <SearchInput placeholder="Поиск челленджей" />

      <ChallengesList searchParams={filters} creatorName={profile?.username} />
    </Stack>
  );
};
