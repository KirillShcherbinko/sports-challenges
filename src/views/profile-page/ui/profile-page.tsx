import { RedirectButton } from '@/features/redirect-button';
import { SignOutButton } from '@/features/sign-out-button';
import { ERoutes } from '@/shared';
import { ProfileInfo } from '@/widgets/profile-info/ui/profile-info';
import { Loader, Stack } from '@mantine/core';
import { Suspense } from 'react';

export const ProfilePage = () => {
  return (
    <Stack>
      <Suspense fallback={<Loader />}>
        <ProfileInfo />
      </Suspense>
      <RedirectButton buttonText="Редактировать" route={ERoutes.PROFILE_EDIT}/>
      <SignOutButton />
    </Stack>
  );
};
