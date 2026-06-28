'use server';

import { z } from 'zod';
import { retryResult, type TGetPaginatedResponseDto } from '@/shared';
import { actionClient } from '@/shared/actions';
import { cacheTag, cacheLife } from 'next/cache';
import { challengeCommentRepository } from '@/entities/challenge-comment/server';
import type { TChallengeCommentDto } from '@/entities/challenge-comment';
import { DEFAULT_LIMIT } from '@/entities/challenge-comment/model/consts';
import { getUser } from '@/entities/auth/server';
import { createServer } from '@/shared/server';
import { profileRepository } from '@/entities/profile/server';

const schema = z.object({
  challengeId: z.string(),
  page: z.coerce.number().int().min(1).default(1),
});

const fetchComments = async (
  challengeId: string,
  page: number
): Promise<TGetPaginatedResponseDto<TChallengeCommentDto>> => {
  'use cache';
  cacheTag(`comments_${challengeId}`);
  cacheLife('minutes');

  return await retryResult(() =>
    challengeCommentRepository.getChallengeComments(challengeId, { page, limit: DEFAULT_LIMIT })
  );
};

export const getCommentsWithOwnershipAction = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput }): Promise<TGetPaginatedResponseDto<TChallengeCommentDto>> => {
    const result = await fetchComments(parsedInput.challengeId, parsedInput.page);

    let currentUsername: string | undefined;
    try {
      const supabase = await createServer();
      const user = await getUser(supabase);
      const profile = await profileRepository.getProfileById(user.id);
      currentUsername = profile?.username;
    } catch {
      currentUsername = undefined;
    }

    const items = result.items.map((comment) => ({
      ...comment,
      isOwnedByUser: currentUsername !== undefined && comment.profile.username === currentUsername,
    }));

    return { items, pagination: result.pagination };
  });
