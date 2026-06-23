'use client';

import { Button, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { useTransition } from 'react';
import { FITNESS_CATEGORY_DATA } from '@/shared';
import { EDIT_DAILY_TASK_DATA } from '../config/edit-daily-task-data';
import type { TEditDailyTaskDto } from '@/entities/daily-task';
import { useParams } from 'next/navigation';
import { updateDailyTaskAction } from '../actions/update-daily-task';

type TEditDailyTaskFormProps = {
  dayNumber: number;
  initialData?: TEditDailyTaskDto;
};

export const EditDailyTaskForm = ({ dayNumber = 0, initialData }: TEditDailyTaskFormProps) => {
  const { schema, fields, defaultValues } = EDIT_DAILY_TASK_DATA;
  const { title, description, exerciseType } = initialData || defaultValues;

  const { challengeId } = useParams<{ challengeId: string }>();
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, formState, control } = useForm<TEditDailyTaskDto>({
    resolver: zodResolver(schema),
    defaultValues: initialData || defaultValues,
  });

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

  const { field: exerciseTypeField, fieldState: exerciseTypeState } = useController({
    name: 'exerciseType',
    control,
    defaultValue: exerciseType,
  });

  const onSubmit = async (formValues: TEditDailyTaskDto) => {
    startTransition(async () => {
      const { serverError } = await updateDailyTaskAction({ challengeId, dayNumber, ...formValues });

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
        return;
      }
    });
  };

  return (
    <Stack w="100%" gap="md" align="center" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack maw={374} w="100%">
        <TextInput {...fields.title} error={titleState.error?.message} {...titleField} />
        <Textarea {...fields.description} error={descriptionState.error?.message} {...descriptionField} />
        <Select
          {...fields.exerciseType}
          data={FITNESS_CATEGORY_DATA}
          error={exerciseTypeState.error?.message}
          {...exerciseTypeField}
        />
      </Stack>

      <Button type="submit" loading={formState.isSubmitting || isPending}>
        Сохранить изменения
      </Button>
    </Stack>
  );
};
