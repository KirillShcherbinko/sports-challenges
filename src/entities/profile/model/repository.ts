import { prisma } from '@/shared';
import type { Profile } from '@/shared/generated/prisma/client';
import type { ProfileCreateInput, ProfileUpdateInput } from '@/shared/generated/prisma/models';
import type { TProfileFilters } from './types';
import { DEFAULT_PROFILE_FILTERS_VALUES } from '../config/default-profile-filters-values';

class ProfileRepository {
  async getProfiles(filters: TProfileFilters = DEFAULT_PROFILE_FILTERS_VALUES) {
    const { search, fitnessLevel, page, limit } = filters;
    return prisma.profile.findMany({
      where: {
        ...(search && {
          username: {
            contains: search,
            mode: 'insensitive',
          },
        }),

        ...(fitnessLevel && {
          fitnessLevel,
        }),
      },

      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async createProfile(data: ProfileCreateInput): Promise<Profile> {
    return prisma.profile.create({ data });
  }

  async getProfileById(profileId: string): Promise<Profile | null> {
    return prisma.profile.findUnique({ where: { id: profileId } });
  }

  async updateProfile(profileId: string, data: ProfileUpdateInput): Promise<Profile> {
    return prisma.profile.update({ data, where: { id: profileId } });
  }

  async deleteProfile(profileId: string): Promise<Profile> {
    return prisma.profile.delete({ where: { id: profileId } });
  }
}

export const profileRepository = new ProfileRepository();
