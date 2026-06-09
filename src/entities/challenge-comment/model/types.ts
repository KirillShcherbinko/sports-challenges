import type { ChallengeCommentGetPayload } from '@/shared/types';

export type TChallengeCommentsFilters = {
  page: number;
  limit: number;
};

export type TChallengeCommentWithAuthor = ChallengeCommentGetPayload<{
  include: { profile: true };
}>;
