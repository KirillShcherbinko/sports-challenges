// src/entities/challenge/model/types.ts

import type { ChallengeCategory, ChallengeDifficulty } from '@/shared/client';

// src/entities/challenge/model/types.ts

import type { Prisma } from '@/shared/client';

export type TChallengeWithCreator = Prisma.ChallengeGetPayload<{
  include: {
    creator: true;
  };
}>;

export type TChallengeFilters = {
  search?: string;
  creatorId?: string;
  category?: ChallengeCategory;
  difficulty?: ChallengeDifficulty;
  page?: number;
  limit?: number;
};

export type TChallengesData = {
  items: TChallengeWithCreator[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
