import { challengeCommentSchema } from '@/entities/challenge-comment';

export const COMMENT_DATA = {
  schema: challengeCommentSchema,
  fields: {
    content: {
      label: 'Комментрарий',
      placeholder: 'Оставьте комментарий',
      rows: 2,
    },
  },
  defaultValues: {
    content: '',
  },
};
