import { getDailyTaskAction } from '../actions/get-daily-task';
import { DailyTaskCard } from '@/entities/daily-task';
import { ErrorAlert } from '@/shared';

type TDailyTaskCardWidgetProps = {
  challengeId: string;
};

export const DailyTaskCardWidget = async ({ challengeId }: TDailyTaskCardWidgetProps) => {
  const { data: task, serverError } = await getDailyTaskAction({ challengeId });

  if (serverError) {
    const retryFn = getDailyTaskAction.bind(null, { challengeId });
    return <ErrorAlert errorMessage={serverError} retryFn={retryFn} />;
  }

  if (!task) {
    return null;
  }

  return (
    <DailyTaskCard
      title={task.title}
      description={task.description}
      exerciseType={task.exerciseType}
      dayNumber={task.dayNumber}
    />
  );
};
