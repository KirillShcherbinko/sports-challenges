import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { mapChallengeLikeToDto } from '@/entities/challenge-like/lib/mappers';

describe('mapChallengeLikeToDto', () => {
  it('should return isLiked and likesCount', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.nat({ max: 10000 }),
        (isLiked, likesCount) => {
          const result = mapChallengeLikeToDto(isLiked, likesCount);
          expect(result).toEqual({ isLiked, likesCount });
        },
      ),
    );
  });

  it('should handle isLiked true and false', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.constant(42),
        (isLiked, likesCount) => {
          const result = mapChallengeLikeToDto(isLiked, likesCount);
          expect(result.isLiked).toBe(isLiked);
        },
      ),
    );
  });

  it('should handle 0 likesCount', () => {
    const result = mapChallengeLikeToDto(false, 0);
    expect(result).toEqual({ isLiked: false, likesCount: 0 });
  });

  it('should handle large likesCount', () => {
    const result = mapChallengeLikeToDto(true, 999999);
    expect(result).toEqual({ isLiked: true, likesCount: 999999 });
  });
});
