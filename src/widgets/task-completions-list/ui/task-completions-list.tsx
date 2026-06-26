import { getTaskCompletionsAction } from '../actions/get-task-completions';
import { TaskCompletionsListContent } from './task-completions-list-content';
import { EmptyListAlert, ErrorAlert } from '@/shared';

type TTaskCompletionsListProps = {
  challengeId: string;
};

export const TaskCompletionsList = async ({ challengeId }: TTaskCompletionsListProps) => {
  const {
    data: completions,
    serverError,
    validationErrors,
  } = await getTaskCompletionsAction({ challengeId });

  if (serverError) {
    const retryFn = getTaskCompletionsAction.bind(null, { challengeId });
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (validationErrors) {
    const retryFn = getTaskCompletionsAction.bind(null, { challengeId });
    return <ErrorAlert errorMessage="Неверные параметры" retryFn={retryFn} />;
  }

  if (!completions || completions.length === 0) {
    return <EmptyListAlert message="История выполнений не найдена" />;
  }

  return <TaskCompletionsListContent items={completions} />;
};
