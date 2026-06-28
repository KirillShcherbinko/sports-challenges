export type TChallengeCommentDto = {
  id: string;
  challengeId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isOwnedByUser?: boolean;
  profile: {
    username: string;
    avatarUrl: string | null;
  };
};

export type TEditChallengeCommentDto = {
  content: string;
};
