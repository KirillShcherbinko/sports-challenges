import { ProfileInfo } from '@/widgets/profile-info';
import { CreatorProfileStats } from '@/widgets/creator-profile-stats';
import { ChallengesList } from '@/widgets/challenges-list';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TCreatorPageProps = {
  params: { username: string };
};

export const CreatorPage = ({ params }: TCreatorPageProps) => {
  return (
    <Stack maw={800} w="100%" p={24} gap={24}>
      <Suspense
        fallback={
          <Center h={200}>
            <Loader />
          </Center>
        }
      >
        <ProfileInfo profileUsername={params.username} />
      </Suspense>

      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <CreatorProfileStats username={params.username} />
      </Suspense>

      <Text fw={600} fz={18}>
        Челленджи креатора
      </Text>
      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <ChallengesList
          searchParams={{ page: 1, limit: 6 }}
          creatorName={params.username}
          isPublished={true}
        />
      </Suspense>
    </Stack>
  );
};
