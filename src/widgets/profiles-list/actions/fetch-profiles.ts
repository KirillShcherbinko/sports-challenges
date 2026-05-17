import { profileFiltersSchema } from '@/entities/profile';
import { EActionStatus, retryResult, type TDataAction } from '@/shared';
import { profileRepository } from '@/entities/profile';
import type { TProfileFilters, TProfilesData } from '@/entities/profile/model/types';

export const fetchProfiles = async (filters: TProfileFilters): Promise<TDataAction<TProfilesData>> => {
  const validatedFilters = profileFiltersSchema.safeParse(filters);
  if (!validatedFilters.success) {
    return { status: EActionStatus.Error, error: 'Неверные значения фильтров' };
  }

  const result = await retryResult(() => profileRepository.getProfiles(filters));
  if (!result.success) {
    return { status: EActionStatus.Error, error: 'Не удалось получить данные' };
  }

  return { status: EActionStatus.Success, data: result.data };
};
