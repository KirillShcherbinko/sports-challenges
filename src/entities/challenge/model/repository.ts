// src/entities/challenge/model/repository.ts

import type {
  Challenge
} from '@/shared/client';

import type { TResult } from '@/shared';

import type {
  TChallengeFilters,
  TChallengesData,
} from './types';

import { DEFAULT_CHALLENGE_FILTERS_VALUES } from '../config/default-challenge-filters-values';

import { prisma } from '@/shared/server';
import type { ChallengeCreateInput, ChallengeUpdateInput, ChallengeWhereInput } from '@/shared/types';

class ChallengeRepository {
  async getChallenges(
    filters: TChallengeFilters = DEFAULT_CHALLENGE_FILTERS_VALUES
  ): Promise<TResult<TChallengesData>> {
    try {
      const {
        search,
        creatorId,
        category,
        difficulty,
        page = 1,
        limit = 12,
      } = filters;

      const where: ChallengeWhereInput = {
        ...(search && {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }),

        ...(creatorId && {
          creatorId,
        }),

        ...(category && {
          category,
        }),

        ...(difficulty && {
          difficulty,
        }),
      };

      const [items, total] = await prisma.$transaction([
        prisma.challenge.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },

          include: {
            creator: true,
          },
        }),

        prisma.challenge.count({
          where,
        }),
      ]);

      return {
        success: true,
        data: {
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error: 'Ошибка получения челленджей',
      };
    }
  }

  async createChallenge(
    data: ChallengeCreateInput
  ): Promise<TResult<Challenge>> {
    try {
      const challenge = await prisma.challenge.create({
        data,
      });

      return {
        success: true,
        data: challenge,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error: 'Ошибка создания челленджа',
      };
    }
  }

  async getChallengeById(
    challengeId: string
  ): Promise<TResult<Challenge | null>> {
    try {
      const challenge = await prisma.challenge.findUnique({
        where: {
          id: challengeId,
        },

        include: {
          creator: true,
          dailyTasks: true,
        },
      });

      return {
        success: true,
        data: challenge,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error: 'Ошибка получения челленджа',
      };
    }
  }

  async updateChallenge(
    challengeId: string,
    data: ChallengeUpdateInput
  ): Promise<TResult<Challenge>> {
    try {
      const challenge = await prisma.challenge.update({
        where: {
          id: challengeId,
        },

        data,
      });

      return {
        success: true,
        data: challenge,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error: 'Ошибка обновления челленджа',
      };
    }
  }

  async deleteChallenge(
    challengeId: string
  ): Promise<TResult<Challenge>> {
    try {
      const challenge = await prisma.challenge.delete({
        where: {
          id: challengeId,
        },
      });

      return {
        success: true,
        data: challenge,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        error: 'Ошибка удаления челленджа',
      };
    }
  }
}

export const challengeRepository = new ChallengeRepository();