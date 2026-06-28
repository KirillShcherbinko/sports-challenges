import { CommentForm } from '@/features/comment-form';
import { getEditCommentFormDataAction } from '../actions/get-edit-comment-form-data';
import { ErrorAlert } from '@/shared';
import { EditCommentContentLayout } from './edit-comment-content-layout';

type TEditCommentContentProps = {
  commentId?: string;
};

export const EditCommentContent = async ({ commentId }: TEditCommentContentProps) => {
  if (!commentId) {
    return (
      <EditCommentContentLayout>
        <CommentForm />
      </EditCommentContentLayout>
    );
  }

  const { data, serverError } = await getEditCommentFormDataAction(commentId);

  if (serverError) {
    const retryFn = getEditCommentFormDataAction.bind(null, commentId);
    return <ErrorAlert errorMessage={`Ошибка: ${serverError}`} retryFn={retryFn} />;
  }

  return (
    <EditCommentContentLayout>
      <CommentForm initialData={data ?? undefined} commentId={commentId} />
    </EditCommentContentLayout>
  );
};
