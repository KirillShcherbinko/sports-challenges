import { prisma } from '@/shared/server';
import type { ChallengeLikeCreateInput } from '@/shared/types';

class ChallengeLikeRepository {
  async isLiked(profileId: string, challengeId: string): Promise<boolean> {
    const like = await prisma.challengeLike.findUnique({ where: { profileId_challengeId: { profileId, challengeId } }});
    return !!like;
  }

  async addLike(data: ChallengeLikeCreateInput): Promise<boolean> {
    const like = await prisma.challengeLike.create({ data });
    return !!like;
  }

  async removeLike(profileId: string, challengeId: string): Promise<boolean> {
    const like = await prisma.challengeLike.delete({ where: { profileId_challengeId: { profileId, challengeId } } });
    return !like;
  }
}

export const challengeLikeRepository = new ChallengeLikeRepository();
