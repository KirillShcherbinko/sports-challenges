import { prisma } from '@/shared/server';

export async function assertChallengeOwner(challengeId: string, userId: string): Promise<void> {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    select: { creatorId: true },
  });

  if (!challenge) {
    throw new Error('Челлендж не найден');
  }

  if (challenge.creatorId !== userId) {
    throw new Error('Вы не можете редактировать чужой челлендж');
  }
}

export async function assertCommentOwner(commentId: string, userId: string): Promise<void> {
  const comment = await prisma.challengeComment.findUnique({
    where: { id: commentId },
    select: { profileId: true },
  });

  if (!comment) {
    throw new Error('Комментарий не найден');
  }

  if (comment.profileId !== userId) {
    throw new Error('Вы не можете редактировать чужой комментарий');
  }
}
