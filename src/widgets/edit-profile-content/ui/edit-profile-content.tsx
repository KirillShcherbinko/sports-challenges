import { EditProfileForm } from '@/features/edit-profile-form';
import { Button, Card, Stack, Text, Title } from '@mantine/core';
import { getEditProfileFormDataAction } from '../actions/get-edit-profile-form-data';

export const EditProfileContent = async () => {
  const { data, serverError } = await getEditProfileFormDataAction();

  if (serverError) {
    return (
      <Stack>
        <Text>{`Ошибка: ${serverError}`}</Text>
        <Button>Повторить</Button>
      </Stack>
    );
  }

  if (!data) {
    return <Text>Не удалось получить данные пользователя</Text>;
  }

  return (
    <Card maw={700} w="100%">
      <Stack gap="xl" w="100%" align="center">
        <Title ta="center">Редактировать профиль</Title>
        <EditProfileForm initialData={data} />
      </Stack>
    </Card>
  );
};
