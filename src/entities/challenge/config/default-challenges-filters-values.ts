import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../model/consts';
import type { TChallengeFilters } from '../model/types';

export const DEFAULT_CHALLENGES_FILTERS_VALUES: TChallengeFilters = {
  search: undefined,
  categories: undefined,
  difficulty: undefined,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
};
