import type { TProfileFilters } from '@/entities/profile';
import { CreatorsPage } from '@/views/creators-page';

type TCreatorsRoute = {
  searchParams: Promise<TProfileFilters>;
};

export default async function CreatorsRoute({ searchParams }: TCreatorsRoute) {
  const resolvedSearchParams = await searchParams;
  return <CreatorsPage searchParams={resolvedSearchParams} />;
}
