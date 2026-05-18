'use client';

import { Select } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LIMIT_OPTIONS } from '../config/limit-options';

export const ProfilesLimitSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLimit = searchParams.get('limit') ?? '10';

  const handleChange = (value: string | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', value);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      maw={180}
      w="100%"
      value={currentLimit}
      onChange={handleChange}
      data={LIMIT_OPTIONS}
      allowDeselect={false}
      label="Профилей на странице"
    />
  );
};
