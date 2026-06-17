import type { TChallengesFilters } from './types';
import { DEFAULT_CHALLENGES_FILTERS_VALUES } from '../config/default-challenges-filters-values';
import { prisma } from '@/shared/server';
import type { ChallengeCreateInput, ChallengeUpdateInput, ChallengeWhereInput } from '@/shared/types';
import type { TChallengeDetailDto, TChallengeDto, TChallengeMutationDto } from './dtos';
import { mapChallengeDetailToDto, mapChallengeMutationToDto, mapChallengeToDto } from '../lib/mappers';
import type { TGetPaginatedResponseDto } from '@/shared';

class ChallengeRepository {
  async getChallenges(
    filters: TChallengesFilters = DEFAULT_CHALLENGES_FILTERS_VALUES
  ): Promise<TGetPaginatedResponseDto<TChallengeDto>> {
    const { search, creatorName, category, difficulty, page, limit, isPublished } = filters;

    const where: ChallengeWhereInput = {
      ...(search && { title: { contains: search } }),
      ...(creatorName && { creator: { username: { contains: creatorName } } }),
      ...(category && { category }),
      ...(difficulty && { difficulty }),
      ...(isPublished && { isPublished }),
    };

    const [rawItems, total] = await prisma.$transaction([
      prisma.challenge.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { creator: true },
      }),

      prisma.challenge.count({ where }),
    ]);

    const items = rawItems.map(mapChallengeToDto);

    return {
      items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async createChallenge(data: ChallengeCreateInput): Promise<TChallengeMutationDto> {
    const challenge = await prisma.challenge.create({ data });
    return mapChallengeMutationToDto(challenge);
  }

  async getChallengeById(challengeId: string): Promise<TChallengeDetailDto | null> {
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
      include: { creator: true },
    });

    return challenge ? mapChallengeDetailToDto(challenge) : null;
  }

  async updateChallenge(challengeId: string, data: ChallengeUpdateInput): Promise<TChallengeMutationDto> {
    const challenge = await prisma.challenge.update({ where: { id: challengeId }, data });
    return mapChallengeMutationToDto(challenge);
  }

  async deleteChallenge(challengeId: string): Promise<TChallengeMutationDto> {
    const challenge = await prisma.challenge.delete({ where: { id: challengeId } });
    return mapChallengeMutationToDto(challenge);
  }
}

export const challengeRepository = new ChallengeRepository();
