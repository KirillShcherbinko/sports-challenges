'use client';

import { Avatar, Button, FileButton, Group, MultiSelect, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EDIT_PROFILE_DATA } from '../config/edit-profile-data';
import type { TEditProfileDto, TEditProfileSchema } from '@/entities/profile';
import { updateProfileAction } from '../actions/update-profile';
import { notifications } from '@mantine/notifications';
import { useAvatarField } from '../lib/use-avatar-field';
import { useTransition } from 'react';
import { FITNESS_CATEGORY_DATA } from '@/shared';

type TEditProfileFormProps = {
  initialData: TEditProfileDto;
};

export const EditProfileForm = ({ initialData }: TEditProfileFormProps) => {
  const { schema, fields } = EDIT_PROFILE_DATA;
  const { username, bio, fitnessLevel, preferences, avatarUrl } = initialData;

  const [isPending, startTransition] = useTransition();

  const { handleSubmit, formState, setValue, control } = useForm<TEditProfileSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const { avatarPreview, onAvatarChange, onAvatarClear } = useAvatarField(avatarUrl || null, setValue);

  const { field: usernameField, fieldState: usernameState } = useController({
    name: 'username',
    control,
    defaultValue: username,
  });

  const { field: bioField, fieldState: bioState } = useController({
    name: 'bio',
    control,
    defaultValue: bio,
  });

  const { field: preferencesField, fieldState: preferencesState } = useController({
    name: 'preferences',
    control,
    defaultValue: preferences,
  });

  const { field: fitnessLevelField, fieldState: fitnessLevelState } = useController({
    name: 'fitnessLevel',
    control,
    defaultValue: fitnessLevel,
  });

  const onSubmit = async (formValues: TEditProfileSchema) => {
    startTransition(async () => {
      const { serverError } = await updateProfileAction(formValues);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
        return;
      }
    });
  };

  return (
    <Stack w="100%" gap="xl" align="center" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Group w="100%" gap="lg" justify="center">
        <Stack maw={240} w="100%" align="center" gap="md">
          <Avatar src={avatarPreview} size={128} radius="50%" />
          <Stack gap="sm">
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
        </Stack>

        <Stack maw={374} w="100%">
          <TextInput {...fields.username} error={usernameState.error?.message} {...usernameField} />
          <Textarea {...fields.bio} error={bioState.error?.message} {...bioField} value={bioField.value ?? ''} />

          <MultiSelect
            {...fields.preferences}
            data={FITNESS_CATEGORY_DATA}
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

      <Group w="100%" justify="end" gap="sm">
        <Button type="submit" loading={formState.isSubmitting || isPending}>
          Сохранить изменения
        </Button>
      </Group>
    </Stack>
  );
};
