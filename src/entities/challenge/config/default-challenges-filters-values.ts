import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../model/consts";
import type { TChallengesFilters } from "../model/types";

export const DEFAULT_CHALLENGES_FILTERS_VALUES: TChallengesFilters = {
  search: undefined,
  creatorName: undefined,
  category: undefined,
  difficulty: undefined,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  isPublished: true,
};
