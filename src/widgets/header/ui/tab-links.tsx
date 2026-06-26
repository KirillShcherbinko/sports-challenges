'use client';

import { Anchor, Group, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../config/nav-links';

export const TabLinks = () => {
  const pathname = usePathname();

  return (
    <Group gap="xl">
      {navLinks.map((link) => (
        <Anchor component={Link} key={link.href} href={link.href} underline="hover">
          <Text
            fz={14}
            c={pathname === link.href ? 'var(--mantine-color-dark-0)' : 'var(--mantine-color-dark-2)'}
            fw={pathname === link.href ? 600 : 400}
          >
            {link.name}
          </Text>
        </Anchor>
      ))}
    </Group>
  );
};
