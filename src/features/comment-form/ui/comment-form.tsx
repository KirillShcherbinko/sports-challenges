'use client';

import type { TEditChallengeCommentDto } from '@/entities/challenge-comment';
import { COMMENT_DATA } from '../config/comment-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { updateCommentAction } from '../actions/update-comment';
import { addCommentAction } from '../actions/add-comment';
import { Button, Group, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';

type TCommentFormProps = {
  initialData?: TEditChallengeCommentDto;
};

export const CommentForm = ({ initialData }: TCommentFormProps) => {
  const { schema, fields, defaultValues } = COMMENT_DATA;
  const { challengeId } = useParams<{ challengeId: string }>();

  const [isPending, startTransition] = useTransition();

  const { formState, handleSubmit, register } = useForm<TEditChallengeCommentDto>({
    resolver: zodResolver(schema),
    defaultValues: initialData || defaultValues,
  });

  const onSubmit = async (formValues: TEditChallengeCommentDto) => {
    startTransition(async () => {
      const { serverError, validationErrors } = initialData
        ? await updateCommentAction({ challengeId, ...formValues })
        : await addCommentAction({ challengeId, ...formValues });

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }

      if (validationErrors) {
        notifications.show({ title: 'Ошибка валидации', message: validationErrors._errors?.join(', '), color: 'red' });
      }
    });
  };

  return (
    <Group component="form" gap="sm" maw={540} w="100%" align="start" onSubmit={handleSubmit(onSubmit)}>
      <Textarea error={formState.errors.content?.message} {...fields.content} {...register('content')} />
      <Button type="submit" loading={formState.isSubmitting || isPending}>
        {initialData ? 'Изменить' : 'Отправить'}
      </Button>
    </Group>
  );
};
