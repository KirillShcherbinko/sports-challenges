import { ChallengeInfo } from '@/widgets/challenge-info';
import { EditCommentContent } from '@/widgets/edit-comment-content';
import { ChallengeCommentsList } from '@/widgets/challenge-comments-list';
import { ParticipateInChallengeButton } from '@/features/participate-in-challenge-button';
import { Center, Loader, Stack } from '@mantine/core';
import { Suspense } from 'react';

type TChallengeDetailPageProps = {
  challengeId: string;
};

export const ChallengeDetailPage = ({ challengeId }: TChallengeDetailPageProps) => {
  return (
    <Stack maw={520} w="100%" py={32} px={48} gap={24}>
      <Suspense
        fallback={
          <Center h={200}>
            <Loader />
          </Center>
        }
      >
        <ChallengeInfo challengeId={challengeId} />
      </Suspense>
      <ParticipateInChallengeButton />
      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <EditCommentContent />
      </Suspense>
      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <ChallengeCommentsList challengeId={challengeId} />
      </Suspense>
    </Stack>
  );
};
