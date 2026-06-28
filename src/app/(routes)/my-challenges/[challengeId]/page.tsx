import { UserChallengePage } from '@/views/user-challenge-page';
import { idSchema } from '@/shared';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function MyChallengeRoute({ params }: Props) {
  const { challengeId } = await params;
  const parsed = idSchema.safeParse(challengeId);
  if (!parsed.success) notFound();
  return <UserChallengePage challengeId={parsed.data} />;
}
