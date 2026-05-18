import { ChallengesList } from '@/widgets/challenges-list/ui/challenges-list';

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: unknown;
    difficulty?: unknown;
    creatorId?: string;
    page?: string;
  }>;
};

export default async function ChallengesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <ChallengesList searchParams={params} />
  );
}