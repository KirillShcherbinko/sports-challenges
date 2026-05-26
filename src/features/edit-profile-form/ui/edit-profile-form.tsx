'use client';

import { Avatar, Button, Card, FileButton, Group, Select, Stack, TagsInput, Textarea, TextInput } from '@mantine/core';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EDIT_PROFILE_DATA } from '../config/edit-profile-data';
import type { TEditProfileData, TEditProfileSchema } from '@/entities/profile';
import { updateProfileAction } from '../actions/update-profile';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { ERoutes } from '@/shared';
import { useAvatarField } from '../lib/use-avatar-field';
import { useTransition } from 'react';

type TEditProfileFormProps = {
  initialData: TEditProfileData;
};

export const EditProfileForm = ({ initialData }: TEditProfileFormProps) => {
  const { schema, fields } = EDIT_PROFILE_DATA;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, formState, setValue, control } = useForm<TEditProfileSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const { avatarPreview, onAvatarChange, onAvatarClear } = useAvatarField(initialData.avatarUrl || null, setValue);

  const { field: usernameField, fieldState: usernameState } = useController({
    name: 'username',
    control,
    defaultValue: initialData.username,
  });

  const { field: bioField, fieldState: bioState } = useController({
    name: 'bio',
    control,
    defaultValue: initialData.bio,
  });

  const { field: preferencesField, fieldState: preferencesState } = useController({
    name: 'preferences',
    control,
    defaultValue: initialData.preferences,
  });

  const { field: fitnessLevelField, fieldState: fitnessLevelState } = useController({
    name: 'fitnessLevel',
    control,
    defaultValue: initialData.fitnessLevel,
  });

  const onSubmit = async (formValues: TEditProfileSchema) => {
    startTransition(async () => {
      const result = await updateProfileAction(formValues);

      if (result.serverError) {
        notifications.show({ title: 'Ошибка', message: result.serverError, color: 'red' });
        return;
      }

      if (result.data) {
        router.push(ERoutes.PROFILE);
      }
    });
  };

  return (
    <Stack maw={560} w="100%" gap="lg" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Group w="100%">
        <Card>
          <Stack maw={240} w="100%">
            <Avatar src={avatarPreview} size={96} radius="xl" />
            <FileButton onChange={onAvatarChange} {...fields.avatar}>
              {(props) => (
                <Button variant="default" {...props}>
                  Загрузить аватар
                </Button>
              )}
            </FileButton>
            <Button disabled={!avatarPreview} variant="filled" color="red" onClick={onAvatarClear}>
              Удалить аватар
            </Button>
          </Stack>
        </Card>

        <Stack>
          <TextInput {...fields.username} error={usernameState.error?.message} {...usernameField} />
          <Textarea {...fields.bio} error={bioState.error?.message} {...bioField} value={bioField.value ?? ''} />

          <TagsInput
            {...fields.preferences}
            value={preferencesField.value ?? []}
            onChange={preferencesField.onChange}
            error={preferencesState.error?.message}
          />

          <Select
            {...fields.fitnessLevel}
            value={fitnessLevelField.value}
            onChange={fitnessLevelField.onChange}
            error={fitnessLevelState.error?.message}
          />
        </Stack>
      </Group>

      <Button type="submit" loading={formState.isSubmitting || isPending}>
        Сохранить изменения
      </Button>
    </Stack>
  );
};
