import { CreatorPage } from '@/views/creator-page';
import { usernameSchema } from '@/entities/profile';
import { notFound } from 'next/navigation';

type TCreatorRouteProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function CreatorRoute({ params, searchParams }: TCreatorRouteProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const parsed = usernameSchema.safeParse(resolvedParams.username);
  if (!parsed.success) notFound();
  return <CreatorPage params={{ username: parsed.data }} searchParams={resolvedSearchParams} />;
}
