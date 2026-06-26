import { PublishChallengePage } from '@/views/publish-challenge-page';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function PublishChallengeRoute({ params }: Props) {
  const { challengeId } = await params;
  return <PublishChallengePage challengeId={challengeId} />;
}
