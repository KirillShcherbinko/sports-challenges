import { ChallengeDetailPage } from '@/views/challenge-detail-page';
import { idSchema } from '@/shared';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeRoute({ params }: Props) {
  const { challengeId } = await params;
  const parsed = idSchema.safeParse(challengeId);
  if (!parsed.success) notFound();
  return <ChallengeDetailPage challengeId={parsed.data} />;
}
