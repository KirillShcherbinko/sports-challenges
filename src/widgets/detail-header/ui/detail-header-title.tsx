import { Text } from '@mantine/core';
import { getChallengeTitleAction } from '../actions/get-challenge-title';

type DetailHeaderServerTitleProps = {
  challengeId: string;
  fallbackTitle: string;
};

export const DetailHeaderServerTitle = async ({ challengeId, fallbackTitle }: DetailHeaderServerTitleProps) => {
  const { data, serverError } = await getChallengeTitleAction(challengeId);

  if (serverError || !data) {
    return <Text fw={600} fz={18}>{fallbackTitle}</Text>;
  }

  return <Text fw={600} fz={18}>{data}</Text>;
};
