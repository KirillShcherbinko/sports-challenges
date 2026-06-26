'use client';

import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import type { PropsWithChildren } from 'react';
import { Header } from '@/widgets/header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const isPinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell padding={0} header={{ height: 64, collapsed: !isPinned, offset: false }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main maw={1280} w="100%" mih="100vh - 64px">
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
