import { getUser } from '@/entities/auth/server';
import { challengeIdSchema } from '@/entities/challenge';
import type { TChallengeLikeDto } from '@/entities/challenge-like/model/dtos';
import { challengeLikeRepository } from '@/entities/challenge-like/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';

export const getLikeDataAction = actionClient
  .inputSchema(challengeIdSchema)
  .action(async ({ parsedInput: challengeId }): Promise<TChallengeLikeDto> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    return await challengeLikeRepository.getLike(user.id, challengeId);
  });
