'use client';

import type { TEditChallengeCommentDto } from '@/entities/challenge-comment';
import { COMMENT_DATA } from '../config/comment-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { updateCommentAction } from '../actions/update-comment';
import { addCommentAction } from '../actions/add-comment';
import { Button, Group, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';

type TCommentFormProps = {
  initialData?: TEditChallengeCommentDto;
  commentId?: string;
};

export const CommentForm = ({ initialData, commentId }: TCommentFormProps) => {
  const { schema, fields, defaultValues } = COMMENT_DATA;
  const { challengeId } = useParams<{ challengeId: string }>();
  const router = useRouter();

  const { content } = initialData || defaultValues;
  const [isPending, startTransition] = useTransition();

  const { formState, handleSubmit, control, reset } = useForm<TEditChallengeCommentDto>({
    resolver: zodResolver(schema),
    defaultValues: initialData || defaultValues,
  });

  const { field: contentField, fieldState: contentState } = useController({
    name: 'content',
    control,
    defaultValue: content,
  });

  const onSubmit = async (formValues: TEditChallengeCommentDto) => {
    startTransition(async () => {
      const { serverError, validationErrors } =
        initialData && commentId
          ? await updateCommentAction({ commentId, ...formValues })
          : await addCommentAction({ challengeId, ...formValues });

      if (serverError) {
        notifications.show({ title: 'Ошибка', message: serverError, color: 'red' });
      }

      if (validationErrors) {
        notifications.show({ title: 'Ошибка валидации', message: validationErrors._errors?.join(', '), color: 'red' });
      }

      if (!serverError && !validationErrors) {
        router.refresh();
        reset();
      }
    });
  };

  return (
    <Group component="form" gap="sm" w="100%" align="end" justify="center" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        w="65%"
        {...fields.content}
        error={contentState.error?.message}
        {...contentField}
        styles={{
          input: {
            backgroundColor: 'var(--mantine-color-dark-7)',
            border: '1px solid var(--mantine-color-dark-6)',
          },
        }}
      />
      <Button type="submit" loading={formState.isSubmitting || isPending}>
        {initialData ? 'Изменить' : 'Отправить'}
      </Button>
    </Group>
  );
};
