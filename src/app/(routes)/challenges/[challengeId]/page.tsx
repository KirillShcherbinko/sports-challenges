import { ChallengeDetailPage } from '@/views/challenge-detail-page';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeRoute({ params }: Props) {
  const { challengeId } = await params;
  return <ChallengeDetailPage challengeId={challengeId} />;
}
