import { Avatar, Button } from '@mantine/core';
import Link from 'next/link';
import { ERoutes } from '@/shared';
import { getProfileAvatarAction } from '../actions/get-profile-avatar';

export const HeaderProfile = async () => {
  const { data } = await getProfileAvatarAction();

  if (!data?.isAuthenticated) {
    return (
      <Button component={Link} href={ERoutes.SIGN_IN} variant="subtle" size="compact-md">
        Войти
      </Button>
    );
  }

  return (
    <Avatar
      src={data.avatarUrl}
      size={36}
      radius="xl"
      styles={{ root: { backgroundColor: 'var(--mantine-color-brand-6)' } }}
    >
      A
    </Avatar>
  );
};
