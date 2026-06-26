'use client';

import { Burger, Drawer, Group, Stack, Divider, useMatches } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Suspense } from 'react';
import { HeaderLogo } from './header-logo';
import { HeaderProfile } from './header-profile';
import { HeaderProfileSkeleton } from './header-profile-skeleton';
import { TabLinks } from './tab-links';

export const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMatches({
    base: true,
    sm: false,
  });

  return (
    <Group h={64} px={24} justify="space-between" align="center" style={{ borderBottom: '1px solid var(--mantine-color-dark-6)' }}>
      {isMobile ? (
        <>
          <HeaderLogo />
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          <Drawer opened={opened} onClose={close} title="Navigation">
            <Stack gap={20}>
              <TabLinks />
              <Divider />
              <Suspense fallback={<HeaderProfileSkeleton />}>
                <HeaderProfile />
              </Suspense>
            </Stack>
          </Drawer>
        </>
      ) : (
        <>
          <Group gap={16}>
            <HeaderLogo />
            <TabLinks />
          </Group>
          <Suspense fallback={<HeaderProfileSkeleton />}>
            <HeaderProfile />
          </Suspense>
        </>
      )}
    </Group>
  );
};
