import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../model/consts';
import type { TMyChallengesFilters } from '../model/types';

export const DEFAULT_MY_CHALLENGES_FILTERS_VALUES: TMyChallengesFilters = {
  search: undefined,
  creatorName: undefined,
  status: undefined,
  category: undefined,
  difficulty: undefined,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
};
