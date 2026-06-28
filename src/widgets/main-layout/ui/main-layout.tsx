'use client';

import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import type { PropsWithChildren, ReactNode } from 'react';
import { Suspense } from 'react';

type MainLayoutProps = PropsWithChildren & {
  headerSlot: ReactNode;
};

export const MainLayout = ({ children, headerSlot }: MainLayoutProps) => {
  const isPinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell padding={0} header={{ height: 64, collapsed: !isPinned }}>
      <AppShell.Header>{headerSlot}</AppShell.Header>
      <AppShell.Main maw={1200} w="100%" mih="100vh - 64px">
        <Suspense>{children}</Suspense>
      </AppShell.Main>
    </AppShell>
  );
};
