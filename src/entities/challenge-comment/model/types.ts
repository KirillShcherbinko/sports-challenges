import type { ChallengeCommentGetPayload } from '@/shared/types';
import type z from 'zod';
import type { challengeCommentSchema } from './schemas';

export type TChallengeCommentsFilters = {
  page: number;
  limit: number;
};

export type TChallengeCommentWithAuthor = ChallengeCommentGetPayload<{
  include: { profile: true };
}>;

export type TChallengeCommentSchema = z.infer<typeof challengeCommentSchema>;
