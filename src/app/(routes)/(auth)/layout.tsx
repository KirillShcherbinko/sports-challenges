import { AuthLayout } from '@/widgets/auth-layout';
import type { PropsWithChildren } from 'react';

export default function AuthGroupLayout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
