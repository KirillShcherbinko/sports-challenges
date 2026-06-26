import { CommentForm } from '@/features/comment-form';
import { getEditCommentFormDataAction } from '../actions/get-edit-comment-form-data';
import { EmptyListAlert, ErrorAlert } from '@/shared';
import { EditCommentContentLayout } from './edit-comment-content-layout';

type TEditCommentContentProps = {
  challengeId: string;
};

export const EditCommentContent = async ({ challengeId }: TEditCommentContentProps) => {
  const { data, serverError } = await getEditCommentFormDataAction(challengeId);

  if (serverError) {
    const retryFn = getEditCommentFormDataAction.bind(null, challengeId);
    return <ErrorAlert errorMessage={`Ошибка: ${serverError}`} retryFn={retryFn} />;
  }

  if (!data) {
    return <EmptyListAlert message="Не удалось получить данные комментария" />;
  }

  return (
    <EditCommentContentLayout>
      <CommentForm initialData={data} />
    </EditCommentContentLayout>
  );
};
