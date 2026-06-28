import { EditChallengeContent } from '@/widgets/edit-challenge-content';
import { idSchema } from '@/shared';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeEditRoute({ params }: Props) {
  const { challengeId } = await params;
  const parsed = idSchema.safeParse(challengeId);
  if (!parsed.success) notFound();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 48px' }}>
      <EditChallengeContent challengeId={parsed.data} />
    </div>
  );
}
