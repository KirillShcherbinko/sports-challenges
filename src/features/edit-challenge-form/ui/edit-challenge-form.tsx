'use client';

import { Button, FileInput, MultiSelect, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { useTransition } from 'react';
import { CHALLENGE_DIFFICULTY_DATA, FITNESS_CATEGORY_DATA } from '@/shared';
import { useFileField } from '@/shared/hooks';
import type { TChallengeSchema, TEditChallengeDto } from '@/entities/challenge';
import { EDIT_CHALLENGE_DATA } from '../config/edit-challenge-data';
import { useParams } from 'next/navigation';
import { updateChallengeAction } from '../actions/update-challenge';
import { createChallengeAction } from '../actions/create-challenge';

type TEditProfileFormProps = {
  initialData?: TEditChallengeDto;
};

export const EditChallengeForm = ({ initialData }: TEditProfileFormProps) => {
  const { schema, fields, defaultValues } = EDIT_CHALLENGE_DATA;
  const { title, description, coverImageUrl, difficulty, categories } = initialData || defaultValues;

  const { challengeId } = useParams<{ challengeId?: string }>();
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, formState, setValue, control } = useForm<TChallengeSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialData || defaultValues,
  });

  const { onChange: onCoverImageChange } = useFileField('coverImage', coverImageUrl || null, setValue);

  const { field: titleField, fieldState: titleState } = useController({
    name: 'title',
    control,
    defaultValue: title,
  });

  const { field: descriptionField, fieldState: descriptionState } = useController({
    name: 'description',
    control,
    defaultValue: description,
  });

  const { field: categoriesField, fieldState: categoriesState } = useController({
    name: 'categories',
    control,
    defaultValue: categories,
  });

  const { field: difficultyField, fieldState: difficultyState } = useController({
    name: 'difficulty',
    control,
    defaultValue: difficulty,
  });

  const onSubmit = async (formValues: TChallengeSchema) => {
    startTransition(async () => {
      const { serverError } =
        initialData && challengeId
          ? await updateChallengeAction({ id: challengeId, ...formValues })
          : await createChallengeAction(formValues);

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
        return;
      }
    });
  };

  return (
    <Stack w="100%" gap="xl" align="center" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack maw={374} w="100%">
        <TextInput {...fields.title} error={titleState.error?.message} {...titleField} />
        <Textarea {...fields.description} error={descriptionState.error?.message} {...descriptionField} />
        <FileInput {...fields.coverImage} clearSectionMode="clear" onChange={onCoverImageChange} />

        <MultiSelect
          {...fields.categories}
          data={FITNESS_CATEGORY_DATA}
          value={categoriesField.value ?? []}
          onChange={categoriesField.onChange}
          error={categoriesState.error?.message}
        />

        <Select
          {...fields.difficulty}
          data={CHALLENGE_DIFFICULTY_DATA}
          error={difficultyState.error?.message}
          {...difficultyField}
        />
      </Stack>

      <Button type="submit" loading={formState.isSubmitting || isPending}>
        Сохранить
      </Button>
    </Stack>
  );
};
