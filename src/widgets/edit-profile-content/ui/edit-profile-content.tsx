import { EditProfileForm } from '@/features/edit-profile-form';
import { Button, Card, Stack, Text } from '@mantine/core';
import { getEditProfileFormDataAction } from '../actions/get-edit-profile-form-data';

export const EditProfileContent = async () => {
  const { data, serverError } = await getEditProfileFormDataAction();

  if (serverError) {
    return (
      <Stack>
        <Text>{`Ошибка: ${serverError}`}</Text>
        <Button onClick={async () => await getEditProfileFormDataAction()}>Повторить</Button>
      </Stack>
    );
  }

  if (!data) {
    return <Text>Не удалось получить данные пользователя</Text>;
  }

  return (
    <Card>
      <EditProfileForm initialData={data} />
    </Card>
  );
};
