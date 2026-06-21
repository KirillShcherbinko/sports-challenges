'use server';

import { getUser } from '@/entities/auth/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import type { ChallengeCreateInput } from '@/shared/types';
import { uploadCoverImage } from './upload-cover-image';
import { ERoutes } from '@/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { challengeRepository } from '@/entities/challenge/server';
import { challengeSchema } from '@/entities/challenge';

export const updateChallengeAction = actionClient.inputSchema(challengeSchema).action(async ({ parsedInput }) => {
  const supabase = await createServer();
  const user = await getUser(supabase);

  const { title, description, coverImage, difficulty, categories, durationDays } = parsedInput;

  const data: ChallengeCreateInput = {
    creator: { connect: { id: user.id } },
    title,
    description,
    difficulty,
    categories,
    durationDays,
  };

  const challenge = await challengeRepository.createChallenge(data);

  if (coverImage && coverImage.size > 0) {
    const { coverImageUrl, coverImagePath } = await uploadCoverImage({
      supabase,
      coverImage,
      challengeId: challenge.id,
    });
    await challengeRepository.updateChallenge(challenge.id, {
      coverImageUrl,
      coverImagePath,
    });
  }

  revalidatePath(ERoutes.CHALLENGES);
  revalidatePath(ERoutes.MY_CHALLENGES);
  revalidatePath(ERoutes.DISCOVER);

  redirect(ERoutes.MY_CHALLENGES);
});
