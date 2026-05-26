import type { ProfileCreateInput, ProfileUpdateInput } from '@/shared/types';
import type { TProfileFilters, TProfilesData } from './types';
import { DEFAULT_PROFILE_FILTERS_VALUES } from '../config/default-profile-filters-values';
import { prisma } from '@/shared/server';
import type { Profile } from '@/shared/client';

class ProfileRepository {
  async getProfiles(filters: TProfileFilters = DEFAULT_PROFILE_FILTERS_VALUES): Promise<TProfilesData> {
    const { search, fitnessLevel, page, limit } = filters;

    const where = {
      ...(search && { username: { contains: search } }),
      ...(fitnessLevel && { fitnessLevel }),
    };

    const [items, total] = await prisma.$transaction([
      prisma.profile.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.profile.count({ where }),
    ]);

    return {
      items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async createProfile(data: ProfileCreateInput): Promise<Profile> {
    return await prisma.profile.create({ data });
  }

  async getProfileById(profileId: string): Promise<Profile | null> {
    return await prisma.profile.findUnique({ where: { id: profileId } });
  }

  async getProfileByUsername(username: string): Promise<Profile | null> {
    return await prisma.profile.findUnique({ where: { username } });
  }

  async updateProfile(profileId: string, data: ProfileUpdateInput): Promise<Profile> {
    return await prisma.profile.update({ data, where: { id: profileId } });
  }
}

export const profileRepository = new ProfileRepository();
