import { Avatar, Button } from '@mantine/core';
import Link from 'next/link';
import { ERoutes } from '@/shared';
import { getProfileAvatarAction } from '../actions/get-profile-avatar';

export const HeaderProfile = async () => {
  const { data } = await getProfileAvatarAction();

  if (!data?.isAuthenticated) {
    return (
      <Link href={ERoutes.SIGN_IN}>
        <Button variant="subtle" size="compact-md">
          Войти
        </Button>
      </Link>
    );
  }

  return (
    <Link href={ERoutes.PROFILE}>
      <Avatar
        src={data.avatarUrl}
        size={36}
        radius="xl"
        styles={{ root: { backgroundColor: 'var(--mantine-color-brand-6)' } }}
      />
    </Link>
  );
};
