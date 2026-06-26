import { ChallengeProgressDetailPage } from '@/views/challenge-progress-detail-page';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeProgressDetailRoute({ params }: Props) {
  const { challengeId } = await params;
  return <ChallengeProgressDetailPage challengeId={challengeId} />;
}
