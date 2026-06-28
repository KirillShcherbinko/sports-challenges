import { prisma } from '@/shared/server';
import type { TChallengeCommentsFilters } from './types';
import type {
  ChallengeCommentCreateInput,
  ChallengeCommentUpdateInput,
  ChallengeCommentWhereInput,
} from '@/shared/types';
import { mapToChallengeCommentDto } from '../lib/mappers';
import type { TChallengeCommentDto } from './dtos';
import type { TGetPaginatedResponseDto } from '@/shared';

class ChallengeCommentRepository {
  async getChallengeComments(
    challengeId: string,
    filters: TChallengeCommentsFilters
  ): Promise<TGetPaginatedResponseDto<TChallengeCommentDto>> {
    const { page, limit } = filters;
    const where: ChallengeCommentWhereInput = { challengeId };

    const [rawItems, total] = await prisma.$transaction([
      prisma.challengeComment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { profile: true },
      }),

      prisma.challengeComment.count({ where }),
    ]);

    const items = rawItems.map(mapToChallengeCommentDto);

    return {
      items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async createChallengeComment(data: ChallengeCommentCreateInput): Promise<boolean> {
    const challengeComment = await prisma.challengeComment.create({ data });
    return !!challengeComment;
  }

  async getChallengeCommentById(commentId: string): Promise<TChallengeCommentDto | null> {
    const challengeComment = await prisma.challengeComment.findUnique({
      where: { id: commentId },
      include: { profile: true },
    });

    return challengeComment ? mapToChallengeCommentDto(challengeComment) : null;
  }

  async updateChallengeComment(
    commentId: string,
    data: ChallengeCommentUpdateInput
  ): Promise<boolean> {
    const challengeComment = await prisma.challengeComment.update({
      where: { id: commentId },
      data,
    });

    return !!challengeComment;
  }

  async deleteChallengeComment(commentId: string): Promise<boolean> {
    const challengeComment = await prisma.challengeComment.delete({
      where: { id: commentId },
    });

    return !!challengeComment;
  }
}

export const challengeCommentRepository = new ChallengeCommentRepository();
