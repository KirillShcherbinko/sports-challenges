import { PublishChallengePage } from '@/views/publish-challenge-page';
import { idSchema } from '@/shared';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function PublishChallengeRoute({ params }: Props) {
  const { challengeId } = await params;
  const parsed = idSchema.safeParse(challengeId);
  if (!parsed.success) notFound();
  return <PublishChallengePage challengeId={parsed.data} />;
}
