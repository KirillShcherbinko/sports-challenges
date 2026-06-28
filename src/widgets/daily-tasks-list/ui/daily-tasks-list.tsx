import { Stack } from '@mantine/core';
import { getDailyTasksAction } from '../actions/get-daily-tasks';
import { DailyTaskBadge } from '@/entities/daily-task';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { DailyTaskActions } from './daily-task-actions';

type TDailyTasksListProps = {
  challengeId: string;
};

export const DailyTasksList = async ({ challengeId }: TDailyTasksListProps) => {
  const { data: dailyTasks, serverError, validationErrors } = await getDailyTasksAction(challengeId);

  if (serverError) {
    const retryFn = getDailyTasksAction.bind(null, challengeId);
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (validationErrors) {
    const retryFn = getDailyTasksAction.bind(null, challengeId);
    return <ErrorAlert errorMessage="Неверные параметры" retryFn={retryFn} />;
  }

  if (!dailyTasks || dailyTasks.length === 0) {
    return <EmptyListAlert message="Задания не найдены" />;
  }

  return (
    <Stack>
      {dailyTasks.map((dailyTask) => (
        <DailyTaskBadge
          key={dailyTask.id}
          id={dailyTask.id}
          title={dailyTask.title}
          description={dailyTask.description}
          exerciseType={dailyTask.exerciseType}
          dayNumber={dailyTask.dayNumber}
          actionSlot={
            <DailyTaskActions
              dayNumber={dailyTask.dayNumber}
              title={dailyTask.title}
              description={dailyTask.description}
              exerciseType={dailyTask.exerciseType}
            />
          }
        />
      ))}
    </Stack>
  );
};
