import { EditProfileForm } from '@/features/edit-profile-form';
import { getEditProfileFormDataAction } from '../actions/get-edit-profile-form-data';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { EditProfileContentLayout } from './edit-profile-content-layout';

export const EditProfileContent = async () => {
  const { data, serverError } = await getEditProfileFormDataAction();

  if (serverError) {
    return (
      <ErrorAlert errorMessage={`Ошибка: ${serverError}`} retryFn={async () => await getEditProfileFormDataAction()} />
    );
  }

  if (!data) {
    return <EmptyListAlert message="Не удалось получить данные пользователя" />;
  }

  return (
    <EditProfileContentLayout>
      <EditProfileForm initialData={data} />
    </EditProfileContentLayout>
  );
};
