import { UserChallengePage } from '@/views/user-challenge-page';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function MyChallengeRoute({ params }: Props) {
  const { challengeId } = await params;
  return <UserChallengePage challengeId={challengeId} />;
}
