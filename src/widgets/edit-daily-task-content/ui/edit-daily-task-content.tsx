import { EditDailyTaskForm } from '@/features/edit-daily-task-form';
import { getEditDailyTaskFormDataAction } from '../actions/get-edit-daily-task-form-data';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { EditDailyTaskContentLayout } from './edit-daily-task-content-layout';

type TEditDailyTaskContentProps = {
  challengeId: string;
  dayNumber: number;
};

export const EditDailyTaskContent = async ({ challengeId, dayNumber }: TEditDailyTaskContentProps) => {
  const { data, serverError } = await getEditDailyTaskFormDataAction({ challengeId, dayNumber });

  if (serverError) {
    return (
      <ErrorAlert
        errorMessage={`Ошибка: ${serverError}`}
        retryFn={async () => await getEditDailyTaskFormDataAction({ challengeId, dayNumber })}
      />
    );
  }

  if (!data) {
    return <EmptyListAlert message="Не удалось получить данные задания" />;
  }

  return (
    <EditDailyTaskContentLayout>
      <EditDailyTaskForm dayNumber={dayNumber} initialData={data} />
    </EditDailyTaskContentLayout>
  );
};
