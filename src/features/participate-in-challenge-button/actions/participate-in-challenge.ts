'use server';

import { getUser } from '@/entities/auth/server';
import { challengeExistsAndPublished, challengeRepository } from '@/entities/challenge/server';
import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const participateInChallengeAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }): Promise<void> => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    await challengeExistsAndPublished(challengeId);

    await profileChallengeRepository.createProfileChallenge({
      profile: { connect: { id: user.id } },
      challenge: { connect: { id: challengeId } },
    });

    await challengeRepository.updateChallenge(challengeId, { participantsCount: { increment: 1 } });

    revalidatePath(ERoutes.MY_CHALLENGES);

    redirect(`${ERoutes.MY_CHALLENGES}/${challengeId}`);
  });
