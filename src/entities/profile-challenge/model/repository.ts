import type {
  ProfileChallengeCreateInput,
  ProfileChallengeUpdateInput,
  ProfileChallengeWhereInput,
} from '@/shared/types';
import { DEFAULT_PROFILE_CHALLENGES_FILTERS_VALUES } from '../config/default-profile-challenges-filters-values';
import type { TProfileChallengesFilters } from './types';
import type { TGetPaginatedResponseDto } from '@/shared';
import type { TProfileChallengeDto, TProfileChallengeMutationDto, TChallengeProgressDto } from './dtos';
import { prisma } from '@/shared/server';
import { mapProfileChallengeMutationToDto, mapProfileChallengeToDto } from '../lib/mappers';

class ProfileChallengeRepository {
  async getProfileChallenges(
    creatorName: string,
    filters: TProfileChallengesFilters = DEFAULT_PROFILE_CHALLENGES_FILTERS_VALUES
  ): Promise<TGetPaginatedResponseDto<TProfileChallengeDto>> {
    const { search, status, category, difficulty, page, limit } = filters;

    const where: ProfileChallengeWhereInput = {
      profile: { username: creatorName },
      ...(status && { status }),
      challenge: {
        ...(search && { title: { contains: search } }),
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

  async getChallengeProgress(challengeId: string, profileId: string): Promise<TChallengeProgressDto> {
    const [profileChallenge, taskCompletions] = await Promise.all([
      prisma.profileChallenge.findUnique({
        where: { profileId_challengeId: { profileId, challengeId } },
        include: { challenge: { select: { durationDays: true } } },
      }),
      prisma.taskCompletion.findMany({
        where: { challengeId, profileId },
        orderBy: { dayNumber: 'asc' },
      }),
    ]);

    if (!profileChallenge) {
      return { daysCompleted: 0, daysMissed: 0, currentStreak: 0, completionPercentage: 0 };
    }

    const daysCompleted = taskCompletions.filter((t) => t.isCompleted).length;
    const daysMissed = taskCompletions.filter((t) => !t.isCompleted).length;

    let currentStreak = 0;
    for (let i = taskCompletions.length - 1; i >= 0; i--) {
      if (taskCompletions[i].isCompleted) {
        currentStreak++;
      } else {
        break;
      }
    }

    const completionPercentage = Math.round((profileChallenge.currentDay * 100) / profileChallenge.challenge.durationDays);

    return {
      daysCompleted,
      daysMissed,
      currentStreak,
      completionPercentage,
    };
  }
}

export const profileChallengeRepository = new ProfileChallengeRepository();
