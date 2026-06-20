import { getUser } from '@/entities/auth/server';
import { challengeIdSchema } from '@/entities/challenge';
import { challengeLikeRepository } from '@/entities/challenge-like/server';
import { challengeRepository } from '@/entities/challenge/server';
import { ERoutes } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';

export const likeAction = actionClient.inputSchema(challengeIdSchema).action(async ({ parsedInput: challengeId }) => {
  const supabase = await createServer();
  const user = await getUser(supabase);

  const challenge = await challengeRepository.getChallengeById(challengeId);
  if (!challenge) {
    throw new Error('Челлендж не найден');
  }

  const success = await challengeLikeRepository.toggleLike(user.id, challengeId);
  if (!success) {
    throw new Error('Не удалось обновить состояние лайка');
  }

  await challengeRepository.updateChallenge(challengeId, { likesCount: challenge?.likesCount + 1 });

  revalidatePath(ERoutes.CHALLENGES);
  revalidatePath(ERoutes.MY_CHALLENGES);
  revalidatePath(ERoutes.DISCOVER);
});
