import { type TProfileFilters, profileFiltersSchema } from '@/entities/profile';
import type { TProfilesData } from '@/entities/profile/model/types';
import { type TDataAction, EActionStatus } from '@/shared';
import { getCachedProfiles } from './get-chached-profiles';

export const fetchProfiles = async (filters: TProfileFilters): Promise<TDataAction<TProfilesData>> => {
  const validatedFilters = profileFiltersSchema.safeParse(filters);

  if (!validatedFilters.success) {
    return {
      status: EActionStatus.Error,
      error: 'Неверные значения фильтров',
    };
  }

  const result = await getCachedProfiles(validatedFilters.data);

  if (!result.success) {
    return {
      status: EActionStatus.Error,
      error: 'Не удалось получить данные',
    };
  }

  return {
    status: EActionStatus.Success,
    data: result.data,
  };
};
