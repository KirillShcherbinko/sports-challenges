import type { ProfileCreateInput, ProfileUpdateInput } from '@/shared/types';
import type { TProfileFilters } from './types';
import { DEFAULT_PROFILE_FILTERS_VALUES } from '../config/default-profile-filters-values';
import { prisma } from '@/shared/server';
import { mapEditProfileToDto, mapProfileDetailToDto, mapProfileMutationToDto, mapProfileToDto } from '../lib/mappers';
import type { TEditProfileDto, TProfileDetailDto, TProfileDto, TProfileMutationDto, TProfileAnalyticsDto, TCcreatorAnalyticsDto } from './dtos';
import type { TGetPaginatedResponseDto } from '@/shared';

class ProfileRepository {
  async getProfiles(
    filters: TProfileFilters = DEFAULT_PROFILE_FILTERS_VALUES
  ): Promise<TGetPaginatedResponseDto<TProfileDto>> {
    const { search, fitnessLevel, page, limit } = filters;

    const where = {
      ...(search && { username: { contains: search } }),
      ...(fitnessLevel && { fitnessLevel }),
    };

    const [rawItems, total] = await prisma.$transaction([
      prisma.profile.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.profile.count({ where }),
    ]);

    const items = rawItems.map(mapProfileToDto);

    return {
      items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async createProfile(data: ProfileCreateInput): Promise<TProfileMutationDto> {
    const profile = await prisma.profile.create({ data });
    return mapProfileMutationToDto(profile);
  }

  async getProfileById(profileId: string): Promise<TProfileDetailDto | null> {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    return profile ? mapProfileDetailToDto(profile) : null;
  }

  async getProfileByUsername(username: string): Promise<TProfileDetailDto | null> {
    const profile = await prisma.profile.findUnique({ where: { username } });
    return profile ? mapProfileDetailToDto(profile) : null;
  }

  async getEditProfileById(profileId: string): Promise<TEditProfileDto | null> {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    return profile ? mapEditProfileToDto(profile) : null;
  }

  async updateProfile(profileId: string, data: ProfileUpdateInput): Promise<TProfileMutationDto> {
    const profile = await prisma.profile.update({ data, where: { id: profileId } });
    return mapProfileMutationToDto(profile);
  }

  async getProfileAnalytics(profileId: string): Promise<TProfileAnalyticsDto> {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { totalCompletedTasks: true },
    });

    const [challengesCompleted, createdChallenges, achievementsCount] = await Promise.all([
      prisma.profileChallenge.count({ where: { profileId, status: 'Completed' } }),
      prisma.challenge.count({ where: { creatorId: profileId } }),
      prisma.profileAchievement.count({ where: { profileId } }),
    ]);

    return {
      challengesCompleted,
      completedTasks: profile?.totalCompletedTasks ?? 0,
      createdChallenges,
      achievementsCount,
    };
  }

  async getCreatorAnalytics(username: string): Promise<TCcreatorAnalyticsDto> {
    const profile = await prisma.profile.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!profile) {
      return { challengesCount: 0, avgCompletionRate: 0, achievementsCount: 0 };
    }

    const [challengesCount, achievementsCount, profileChallenges] = await Promise.all([
      prisma.challenge.count({ where: { creatorId: profile.id } }),
      prisma.profileAchievement.count({ where: { profileId: profile.id } }),
      prisma.profileChallenge.findMany({
        where: { challenge: { creatorId: profile.id } },
        include: { challenge: { select: { durationDays: true } } },
      }),
    ]);

    const avgCompletionRate = profileChallenges.length > 0
      ? Math.round(
          profileChallenges.reduce((sum, pc) => sum + Math.round((pc.currentDay * 100) / pc.challenge.durationDays), 0) /
            profileChallenges.length,
        )
      : 0;

    return {
      challengesCount,
      avgCompletionRate,
      achievementsCount,
    };
  }
}

export const profileRepository = new ProfileRepository();
