import type { TPaginationResponse } from '@/shared';

export type TChallengeCommentDto = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    username: string;
    avatarUrl: string | null;
  };
};

export type TGetChallengeCommentsResponse = {
  items: TChallengeCommentDto[];
  pagination: TPaginationResponse;
};
