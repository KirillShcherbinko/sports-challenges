import { describe, expect, it } from 'vitest';
import { DEFAULT_CHALLENGES_FILTERS_VALUES } from '@/entities/challenge/config/default-challenges-filters-values';
import {
  DEFAULT_LIMIT as CHALLENGE_DEFAULT_LIMIT,
  DEFAULT_PAGE as CHALLENGE_DEFAULT_PAGE,
  MIN_PAGE as CHALLENGE_MIN_PAGE,
  MIN_LIMIT as CHALLENGE_MIN_LIMIT,
  MAX_LIMIT as CHALLENGE_MAX_LIMIT,
} from '@/entities/challenge/model/consts';
import { DEFAULT_CHALLENGE_COMMENTS_FILTERS } from '@/entities/challenge-comment/config/default-challenge-comments-filters';
import {
  DEFAULT_LIMIT as COMMENT_DEFAULT_LIMIT,
  DEFAULT_PAGE as COMMENT_DEFAULT_PAGE,
} from '@/entities/challenge-comment/model/consts';
import { DEFAULT_PROFILE_FILTERS_VALUES } from '@/entities/profile/config/default-profile-filters-values';
import {
  DEFAULT_LIMIT as PROFILE_DEFAULT_LIMIT,
  DEFAULT_PAGE as PROFILE_DEFAULT_PAGE,
  MIN_PAGE as PROFILE_MIN_PAGE,
  MIN_LIMIT as PROFILE_MIN_LIMIT,
  MAX_LIMIT as PROFILE_MAX_LIMIT,
} from '@/entities/profile/model/consts';
import { DEFAULT_PROFILE_CHALLENGES_FILTERS_VALUES } from '@/entities/profile-challenge/config/default-profile-challenges-filters-values';
import {
  DEFAULT_LIMIT as PC_DEFAULT_LIMIT,
  DEFAULT_PAGE as PC_DEFAULT_PAGE,
} from '@/entities/profile-challenge/model/consts';

describe('challenge filters consistency', () => {
  it('DEFAULT_CHALLENGES_FILTERS_VALUES uses consts values', () => {
    expect(DEFAULT_CHALLENGES_FILTERS_VALUES.page).toBe(CHALLENGE_DEFAULT_PAGE);
    expect(DEFAULT_CHALLENGES_FILTERS_VALUES.limit).toBe(CHALLENGE_DEFAULT_LIMIT);
  });

  it('challenge filters have positive page and limit bounds', () => {
    expect(CHALLENGE_MIN_PAGE).toBeGreaterThan(0);
    expect(CHALLENGE_MIN_LIMIT).toBeGreaterThan(0);
    expect(CHALLENGE_MAX_LIMIT).toBeGreaterThan(CHALLENGE_MIN_LIMIT);
  });
});

describe('challenge-comment filters consistency', () => {
  it('DEFAULT_CHALLENGE_COMMENTS_FILTERS uses consts values', () => {
    expect(DEFAULT_CHALLENGE_COMMENTS_FILTERS.page).toBe(COMMENT_DEFAULT_PAGE);
    expect(DEFAULT_CHALLENGE_COMMENTS_FILTERS.limit).toBe(COMMENT_DEFAULT_LIMIT);
  });
});

describe('profile filters consistency', () => {
  it('DEFAULT_PROFILE_FILTERS_VALUES uses consts values', () => {
    expect(DEFAULT_PROFILE_FILTERS_VALUES.page).toBe(PROFILE_DEFAULT_PAGE);
    expect(DEFAULT_PROFILE_FILTERS_VALUES.limit).toBe(PROFILE_DEFAULT_LIMIT);
  });

  it('profile filters have positive page and limit bounds', () => {
    expect(PROFILE_MIN_PAGE).toBeGreaterThan(0);
    expect(PROFILE_MIN_LIMIT).toBeGreaterThan(0);
    expect(PROFILE_MAX_LIMIT).toBeGreaterThan(PROFILE_MIN_LIMIT);
  });
});

describe('profile-challenge filters consistency', () => {
  it('DEFAULT_PROFILE_CHALLENGES_FILTERS_VALUES uses consts values', () => {
    expect(DEFAULT_PROFILE_CHALLENGES_FILTERS_VALUES.page).toBe(PC_DEFAULT_PAGE);
    expect(DEFAULT_PROFILE_CHALLENGES_FILTERS_VALUES.limit).toBe(PC_DEFAULT_LIMIT);
  });
});

describe('cross-entity consistency', () => {
  it('all entities use the same DEFAULT_PAGE=1', () => {
    expect(CHALLENGE_DEFAULT_PAGE).toBe(1);
    expect(COMMENT_DEFAULT_PAGE).toBe(1);
    expect(PROFILE_DEFAULT_PAGE).toBe(1);
    expect(PC_DEFAULT_PAGE).toBe(1);
  });
});
