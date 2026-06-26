'use server';

import type { TChallengeMutationDto } from '@/entities/challenge';
import { getUser } from '@/entities/auth/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';
import { challengeExistsAndPublished, challengeRepository } from '@/entities/challenge/server';

export const deleteChallengeAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<TChallengeMutationDto> => {
    const supabase = await createServer();
    await getUser(supabase);

    await challengeExistsAndPublished(challengeId);

    const deletedChallenge = await challengeRepository.deleteChallenge(challengeId);

    revalidatePath(ERoutes.CHALLENGES);
    revalidatePath(ERoutes.MY_CHALLENGES);
    revalidatePath(ERoutes.HOME);

    return deletedChallenge;
  });
