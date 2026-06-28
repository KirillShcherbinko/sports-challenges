import { ChallengeInfo } from '@/widgets/challenge-info';
import { ChallengeProgressStats } from '@/widgets/challenge-progress-stats';
import { EditCommentContent } from '@/widgets/edit-comment-content';
import { ChallengeCommentsList } from '@/widgets/challenge-comments-list';
import { Button, Center, Loader, Stack, Text } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

type TUserChallengePageProps = {
  challengeId: string;
};

export const UserChallengePage = ({ challengeId }: TUserChallengePageProps) => {
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

      <Link href={`/my-challenges/${challengeId}/publish`}>
        <Button variant="outline" leftSection={<IconSettings size={16} />}>
          Настроить задания
        </Button>
      </Link>

      <Text fw={600} fz={18}>
        Прогресс
      </Text>
      <Suspense
        fallback={
          <Center h={100}>
            <Loader />
          </Center>
        }
      >
        <ChallengeProgressStats challengeId={challengeId} />
      </Suspense>

      <Text fw={600} fz={18}>
        Комментарии
      </Text>
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
