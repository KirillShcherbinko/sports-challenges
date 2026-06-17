import type { ERoutes } from '@/shared';
import { Button, type ButtonProps } from '@mantine/core';
import Link from 'next/link';

type TRedirectButtonProps = {
  buttonText: string;
  route: ERoutes;
  props?: ButtonProps;
};

export const RedirectButton = ({ buttonText, route, props }: TRedirectButtonProps) => {
  return (
    <Link href={`${route}`}>
      <Button {...props}>{buttonText}</Button>
    </Link>
  );
};
