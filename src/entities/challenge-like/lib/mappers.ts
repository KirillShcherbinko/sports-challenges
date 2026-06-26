import type { TChallengeLikeDto } from '../model/dtos';

export const mapChallengeLikeToDto = (isLiked: boolean, likesCount: number): TChallengeLikeDto => {
  return {
    isLiked,
    likesCount,
  };
};
