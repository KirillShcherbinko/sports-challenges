import type {
  ProfileChallengeCreateInput,
  ProfileChallengeUpdateInput,
  ProfileChallengeWhereInput,
} from '@/shared/types';
import { DEFAULT_MY_CHALLENGES_FILTERS_VALUES } from '../config/default-my-challenges-filters-values';
import type { TProfileChallengesFilters } from './types';
import type { TGetPaginatedResponseDto } from '@/shared';
import type { TProfileChallengeDto, TProfileChallengeMutationDto } from './dtos';
import { prisma } from '@/shared/server';
import { mapProfileChallengeMutationToDto, mapProfileChallengeToDto } from '../lib/mappers';

class ProfileChallengeRepository {
  async getProfileChallenges(
    userId: string,
    filters: TProfileChallengesFilters = DEFAULT_MY_CHALLENGES_FILTERS_VALUES
  ): Promise<TGetPaginatedResponseDto<TProfileChallengeDto>> {
    const { search, creatorName, status, category, difficulty, page, limit } = filters;

    const where: ProfileChallengeWhereInput = {
      profileId: userId,
      ...(status && { status }),
      challenge: {
        ...(search && { title: { contains: search } }),
        ...(creatorName && { creator: { username: { contains: creatorName } } }),
        ...(category && { category }),
        ...(difficulty && { difficulty }),
        isPublished: true,
      },
    };

    const [rawItems, total] = await prisma.$transaction([
      prisma.profileChallenge.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { challenge: true },
      }),

      prisma.profileChallenge.count({ where }),
    ]);

    const items = rawItems.map(mapProfileChallengeToDto);

    return {
      items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getProfileChallengeById(challengeId: string, profileId: string): Promise<TProfileChallengeDto | null> {
    const profileChallenge = await prisma.profileChallenge.findUnique({
      where: { profileId_challengeId: { profileId, challengeId } },
      include: { challenge: true },
    });

    return profileChallenge ? mapProfileChallengeToDto(profileChallenge) : null;
  }

  async createProfileChallenge(data: ProfileChallengeCreateInput): Promise<TProfileChallengeMutationDto> {
    const profileChallenge = await prisma.profileChallenge.create({ data, include: { challenge: true } });
    return mapProfileChallengeMutationToDto(profileChallenge);
  }

  async updateProfileChallenge(
    challengeId: string,
    profileId: string,
    data: ProfileChallengeUpdateInput
  ): Promise<TProfileChallengeMutationDto> {
    const profileChallenge = await prisma.profileChallenge.update({
      where: { profileId_challengeId: { profileId, challengeId } },
      data,
      include: { challenge: true },
    });

    return mapProfileChallengeMutationToDto(profileChallenge);
  }
}

export const profileChallengeRepository = new ProfileChallengeRepository();
