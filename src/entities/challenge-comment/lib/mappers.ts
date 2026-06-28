import type { TChallengeCommentDto } from '../model/dtos';
import type { TChallengeCommentWithAuthor } from '../model/types';

export const mapToChallengeCommentDto = (data: TChallengeCommentWithAuthor): TChallengeCommentDto => {
  return {
    id: data.id,
    challengeId: data.challengeId,
    content: data.content,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    profile: {
      username: data.profile.username,
      avatarUrl: data.profile.avatarUrl,
    },
  };
};
