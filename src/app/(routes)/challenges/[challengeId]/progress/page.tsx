import { ChallengeProgressPage } from '@/views/challenge-progress-page';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeProgressRoute({ params }: Props) {
  const { challengeId } = await params;
  return <ChallengeProgressPage challengeId={challengeId} />;
}
