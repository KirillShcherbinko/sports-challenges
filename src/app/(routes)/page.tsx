import { HomePage } from '@/views/home-page';
import type { TChallengeFilters } from '@/entities/challenge';

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    difficulty?: string;
    page?: string;
  }>;
};

export default async function HomeRoute({ searchParams }: Props) {
  const raw = await searchParams;

  const params: TChallengeFilters = {
    search: raw.search,
    difficulty: raw.difficulty as TChallengeFilters['difficulty'],
    page: raw.page ? Number(raw.page) : 1,
    limit: 12,
  };

  return <HomePage searchParams={params} />;
}
