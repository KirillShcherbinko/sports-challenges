import { ChallengesProgressPage } from '@/views/challenges-progress-page';

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function ChallengesProgressRoute({ searchParams }: Props) {
  const params = await searchParams;
  return <ChallengesProgressPage searchParams={params} />;
}
