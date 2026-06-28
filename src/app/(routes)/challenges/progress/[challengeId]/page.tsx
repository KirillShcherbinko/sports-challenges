import { ChallengeProgressDetailPage } from '@/views/challenge-progress-detail-page';
import { idSchema } from '@/shared';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeProgressDetailRoute({ params }: Props) {
  const { challengeId } = await params;
  const parsed = idSchema.safeParse(challengeId);
  if (!parsed.success) notFound();
  return <ChallengeProgressDetailPage challengeId={parsed.data} />;
}
