'use client';

import { Avatar, Button, FileButton, Group, Select, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EDIT_PROFILE_DATA } from '../config/edit-profile-data';
import type { TEditProfileSchema } from '@/entities/profile';
import { updateProfileAction } from '../actions/update-profile';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export const EditProfileForm = () => {
  const { schema, defaultValues, fields } = EDIT_PROFILE_DATA;

  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState, setValue } = useForm<TEditProfileSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleAvatarChange = (file: File | null) => {
    setAvatar(file);
    setValue('avatar', file);
  };

  const onSubmit = async (formValues: TEditProfileSchema) => {
    startTransition(async () => {
      const result = await updateProfileAction(formValues);

      if (result.serverError) {
        notifications.show({
          title: 'Ошибка',
          message: result.serverError,
          color: 'red',
        });
      }

      if (result.data?.success && result.data.redirect) {
        const redirect = result.data.redirect;

        startTransition(() => {
          router.push(redirect);
        });
      }
    });
  };

  return (
    <Stack maw={560} w="100%" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Group>
        <Avatar src={avatar ? URL.createObjectURL(avatar) : defaultValues.avatar} size={96} radius="xl" />

        <Stack gap={6}>
          <FileButton onChange={handleAvatarChange} accept={fields.avatar.accept}>
            {(props) => (
              <Button variant="light" {...props}>
                Загрузить аватар
              </Button>
            )}
          </FileButton>

          <Text size="xs" c="var(--mantine-color-dark-3)">
            {fields.avatar.description}
          </Text>
        </Stack>
      </Group>

      <TextInput error={formState.errors.username?.message} {...fields.username} {...register('username')} />
      <Textarea error={formState.errors.bio?.message} {...fields.bio} {...register('bio')} />
      <Select
        error={formState.errors.fitnessLevel?.message}
        {...fields.fitnessLevel}
        defaultValue={defaultValues.fitnessLevel}
        onChange={(_value, option) => setValue('fitnessLevel', option.value)}
      />

      <Button type="submit" loading={formState.isSubmitting || isPending}>
        Сохранить изменения
      </Button>
    </Stack>
  );
};
