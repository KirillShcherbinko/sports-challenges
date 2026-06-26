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
    const retryFn = getEditChallengeFormDataAction.bind(null, challengeId);
    return <ErrorAlert errorMessage={`Ошибка: ${serverError}`} retryFn={retryFn} />;
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
