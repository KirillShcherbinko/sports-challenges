import { ProfileChallengesList } from '@/widgets/profile-challenges-list';
import { getMyProfileAction } from '@/widgets/profile-info/actions/get-my-profile';
import { Stack, Text } from '@mantine/core';
import type { TProfileChallengesFilters } from '@/entities/profile-challenge/model/types';

type TChallengesProgressPageProps = {
  searchParams: Record<string, string | undefined>;
};

export const ChallengesProgressPage = async ({ searchParams }: TChallengesProgressPageProps) => {
  const { data: profile } = await getMyProfileAction();

  const filters: TProfileChallengesFilters = {
    search: searchParams.search,
    status: searchParams.status as TProfileChallengesFilters['status'],
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
  };

  return (
    <Stack maw={1200} w="100%" p={24} gap={24}>
      <Text fw={700} fz={28}>
        Мои прогрессы
      </Text>

      <ProfileChallengesList creatorName={profile?.username ?? ''} searchParams={filters} />
    </Stack>
  );
};
