import { EditChallengeContent } from '@/widgets/edit-challenge-content';

type Props = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeEditRoute({ params }: Props) {
  const { challengeId } = await params;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
      <EditChallengeContent challengeId={challengeId} />
    </div>
  );
}
