import type { TProfileFilters } from '@/entities/profile';
import { DiscoverCreatorsPage } from '@/views/discover-creators-page';

type TDiscoverCreatorsRoute = {
  searchParams: Promise<TProfileFilters>;
};

export default async function DiscoverCreatorsRoute({ searchParams }: TDiscoverCreatorsRoute) {
  const resolvedSearchParams = await searchParams;
  return <DiscoverCreatorsPage searchParams={resolvedSearchParams} />;
}
