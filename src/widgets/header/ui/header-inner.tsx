'use client';

import { Burger, Drawer, Group, Stack, Divider, useMatches } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { ReactNode } from 'react';
import { HeaderLogo } from './header-logo';
import { TabLinks } from './tab-links';

type HeaderInnerProps = {
  profileSlot: ReactNode;
};

export const HeaderInner = ({ profileSlot }: HeaderInnerProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMatches({
    base: true,
    sm: false,
  });

  return (
    <Group h={64} px={24} bg="var(--mantine-color-dark-8)" justify="space-between" align="center" style={{ borderBottom: '1px solid var(--mantine-color-dark-6)' }}>
      {isMobile ? (
        <>
          <HeaderLogo />
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          <Drawer opened={opened} onClose={close} title="Navigation">
            <Stack gap={20}>
              <TabLinks />
              <Divider />
              {profileSlot}
            </Stack>
          </Drawer>
        </>
      ) : (
        <>
          <Group gap={16}>
            <HeaderLogo />
            <TabLinks />
          </Group>
          {profileSlot}
        </>
      )}
    </Group>
  );
};
