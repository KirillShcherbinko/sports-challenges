import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../model/consts';
import type { TProfileFilters } from '../model/types';

export const DEFAULT_PROFILE_FILTERS_VALUES: TProfileFilters = {
  search: undefined,
  fitnessLevel: undefined,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
};
