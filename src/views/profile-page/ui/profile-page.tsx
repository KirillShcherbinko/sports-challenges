import { RedirectButton } from '@/features/redirect-button';
import { SignOutButton } from '@/features/sign-out-button';
import { ERoutes } from '@/shared';
import { ProfileInfo } from '@/widgets/profile-info';
import { ProfileStats } from '@/widgets/profile-stats';
import { ChallengesList } from '@/widgets/challenges-list';
import { Center, Loader, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

export const ProfilePage = () => {
  return (
    <Stack maw={800} w="100%" p={24} gap={24}>
      <Suspense
        fallback={
          <Center h={200}>
            <Loader />
          </Center>
        }
      >
        <ProfileInfo />
      </Suspense>

      <RedirectButton buttonText="Редактировать" route={ERoutes.PROFILE_EDIT} />
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
        <ChallengesList searchParams={{ page: 1, limit: 6 }} />
      </Suspense>
    </Stack>
  );
};
