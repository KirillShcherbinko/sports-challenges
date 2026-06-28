import { SignOutButton } from '@/features/sign-out-button';
import { ProfileInfo } from '@/widgets/profile-info';
import { ProfileStats } from '@/widgets/profile-stats';
import { ChallengesList } from '@/widgets/challenges-list';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

type TProfilePageProps = {
  searchParams: Record<string, string | undefined>;
};

export const ProfilePage = ({ searchParams }: TProfilePageProps) => {
  return (
    <Stack w="100%" py={32} px={48} gap={24}>
      <Suspense
        fallback={
          <Center h={200}>
            <Loader />
          </Center>
        }
      >
        <ProfileInfo />
      </Suspense>

      <SignOutButton />

      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <ProfileStats />
      </Suspense>

      <Text fw={600} fz={18}>
        Мои челленджи
      </Text>
      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <ChallengesList searchParams={searchParams} useCurrentUser />
      </Suspense>
    </Stack>
  );
};
