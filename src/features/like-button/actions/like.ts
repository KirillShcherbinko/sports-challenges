'use server';

import { getUser } from '@/entities/auth/server';
import { challengeLikeRepository } from '@/entities/challenge-like/server';
import { challengeExistsAndPublished, challengeRepository } from '@/entities/challenge/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const likeAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<void> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    await challengeExistsAndPublished(challengeId);

    const success = await challengeLikeRepository.toggleLike(user.id, challengeId);
    if (!success) {
      throw new Error('Не удалось обновить состояние лайка');
    }

    await challengeRepository.updateChallenge(challengeId, { likesCount: { increment: 1 } });

    revalidatePath(ERoutes.CHALLENGES);
    revalidatePath(ERoutes.MY_CHALLENGES);
    revalidatePath(ERoutes.HOME);
  });
