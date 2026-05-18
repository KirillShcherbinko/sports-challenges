import type { Profile } from '@/shared/generated/prisma/client';
import type { ProfileCreateInput, ProfileUpdateInput } from '@/shared/generated/prisma/models';
import type { TResult } from '@/shared';
import type { TProfileFilters, TProfilesData } from './types';
import { DEFAULT_PROFILE_FILTERS_VALUES } from '../config/default-profile-filters-values';
import { prisma } from '@/shared/lib/prisma/client';

class ProfileRepository {
  async getProfiles(filters: TProfileFilters = DEFAULT_PROFILE_FILTERS_VALUES): Promise<TResult<TProfilesData>> {
    try {
      const { search, fitnessLevel, page, limit } = filters;

      const where = {
        ...(search && {
          username: { contains: search, mode: 'insensitive' as const },
        }),
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
        success: true,
        data: {
          items,
          pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        },
      };
    } catch(error) {
      console.error(error);
      return { success: false, error: 'Ошибка получения профилей' };
    }
  }

  async createProfile(data: ProfileCreateInput): Promise<TResult<Profile>> {
    try {
      const profile = await prisma.profile.create({ data });
      return { success: true, data: profile };
    } catch {
      return { success: false, error: 'Ошибка создания профиля' };
    }
  }

  async getProfileById(profileId: string): Promise<TResult<Profile | null>> {
    try {
      const profile = await prisma.profile.findUnique({ where: { id: profileId } });
      return { success: true, data: profile };
    } catch {
      return { success: false, error: 'Ошибка получения профиля' };
    }
  }

  async getProfileByUsername(username: string): Promise<TResult<Profile | null>> {
    try {
      const profile = await prisma.profile.findUnique({ where: { username } });
      return { success: true, data: profile };
    } catch {
      return { success: false, error: 'Ошибка получения профиля' };
    }
  }

  async updateProfile(profileId: string, data: ProfileUpdateInput): Promise<TResult<Profile>> {
    try {
      const profile = await prisma.profile.update({ data, where: { id: profileId } });
      return { success: true, data: profile };
    } catch {
      return { success: false, error: 'Ошибка обновления профиля' };
    }
  }

  async deleteProfile(profileId: string): Promise<TResult<Profile>> {
    try {
      const profile = await prisma.profile.delete({ where: { id: profileId } });
      return { success: true, data: profile };
    } catch {
      return { success: false, error: 'Ошибка удаления профиля' };
    }
  }
}

export const profileRepository = new ProfileRepository();
