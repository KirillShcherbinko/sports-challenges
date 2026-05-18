import { SignOutButton } from '@/features/sign-out-button';
import { ProfileInfo } from '@/widgets/profile-info/ui/profile-info';
import { Button, Stack } from '@mantine/core';

export const ProfilePage = () => {
  return (
    <Stack>
      <ProfileInfo />
      <Button>Редактировать</Button>
      <SignOutButton />
    </Stack>
  );
};
