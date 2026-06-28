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

  async getLikeCount(challengeId: string): Promise<TChallengeLikeDto> {
    const data = await challengeRepository.getChallengeById(challengeId);
    return { isLiked: false, likesCount: data?.likesCount || 0 };
  }

  async toggleLike(profileId: string, challengeId: string): Promise<boolean> {
    const like = await this.getLike(profileId, challengeId);
    if (like.isLiked) {
      await prisma.challengeLike.delete({ where: { profileId_challengeId: { profileId, challengeId } } });
      return false;
    }
    await prisma.challengeLike.create({ data: { profileId, challengeId } });
    return true;
  }
}

export const challengeLikeRepository = new ChallengeLikeRepository();
