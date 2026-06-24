import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../model/consts';
import type { TProfileChallengesFilters } from '../model/types';

export const DEFAULT_PROFILE_CHALLENGES_FILTERS_VALUES: TProfileChallengesFilters = {
  search: undefined,
  status: undefined,
  category: undefined,
  difficulty: undefined,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
};
