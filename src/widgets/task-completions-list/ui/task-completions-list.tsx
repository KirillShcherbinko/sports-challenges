import { getTaskCompletionsAction } from '../actions/get-task-completions';
import { TaskCompletionsListContent } from './task-completions-list-content';
import { EmptyListAlert, ErrorAlert } from '@/shared';

type TTaskCompletionsListProps = {
  challengeId: string;
  profileId: string;
};

export const TaskCompletionsList = async ({ challengeId, profileId }: TTaskCompletionsListProps) => {
  const {
    data: completions,
    serverError,
    validationErrors,
  } = await getTaskCompletionsAction({ challengeId, profileId });

  if (serverError) {
    return (
      <ErrorAlert
        errorMessage={serverError}
        retryFn={async () => await getTaskCompletionsAction({ challengeId, profileId })}
      />
    );
  }

  if (validationErrors) {
    return (
      <ErrorAlert
        errorMessage="Неверные параметры"
        retryFn={async () => await getTaskCompletionsAction({ challengeId, profileId })}
      />
    );
  }

  if (!completions || completions.length === 0) {
    return <EmptyListAlert message="История выполнений не найдена" />;
  }

  return <TaskCompletionsListContent items={completions} />;
};
