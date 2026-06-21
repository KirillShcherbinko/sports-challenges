'use server';

import { getUser } from '@/entities/auth/server';
import { profileChallengeRepository } from '@/entities/profile-challenge/server';
import { ERoutes, idSchema } from '@/shared';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const participateInChallengeAction = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: challengeId }) => {
    const supabase = await createServer();
    const user = await getUser(supabase);

    await profileChallengeRepository.createProfileChallenge({
      profile: { connect: { id: user.id } },
      challenge: { connect: { id: challengeId } },
    });

    revalidatePath(ERoutes.MY_CHALLENGES);

    redirect(`${ERoutes.MY_CHALLENGES}/${challengeId}`);
  });
