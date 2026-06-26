import { EditChallengeForm } from '@/features/edit-challenge-form';
import { getEditChallengeFormDataAction } from '../actions/get-edit-challenge-form-data';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { EditChallengeContentLayout } from './edit-challenge-content-layout';

type TEditChallengeContentProps = {
  challengeId: string;
};

export const EditChallengeContent = async ({ challengeId }: TEditChallengeContentProps) => {
  const { data, serverError } = await getEditChallengeFormDataAction(challengeId);

  if (serverError) {
    return (
      <ErrorAlert
        errorMessage={`Ошибка: ${serverError}`}
        retryFn={async () => await getEditChallengeFormDataAction(challengeId)}
      />
    );
  }

  if (!data) {
    return <EmptyListAlert message="Не удалось получить данные челленджа" />;
  }

  return (
    <EditChallengeContentLayout>
      <EditChallengeForm initialData={data} />
    </EditChallengeContentLayout>
  );
};
