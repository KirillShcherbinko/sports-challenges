import { challengeRepository } from '@/entities/challenge/server';
import { prisma } from '@/shared/server';
import { mapChallengeLikeToDto } from '../lib/mappers';
import type { TChallengeLikeDto } from './dtos';

class ChallengeLikeRepository {
  async getLike(profileId: string, challengeId: string): Promise<TChallengeLikeDto> {
    const like = await prisma.challengeLike.findUnique({
      where: { profileId_challengeId: { profileId, challengeId } },
    });
    const data = await challengeRepository.getChallengeById(challengeId);
    return mapChallengeLikeToDto(!!like, data?.likesCount || 0);
  }

  async toggleLike(profileId: string, challengeId: string): Promise<boolean> {
    const like = await this.getLike(profileId, challengeId);
    const result = like.isLiked
      ? await prisma.challengeLike.delete({ where: { profileId_challengeId: { profileId, challengeId } } })
      : await prisma.challengeLike.create({ data: { profileId, challengeId } });

    return !!result;
  }
}

export const challengeLikeRepository = new ChallengeLikeRepository();
