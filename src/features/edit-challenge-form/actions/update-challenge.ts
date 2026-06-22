'use server';

import { getUser } from '@/entities/auth/server';
import { actionClient } from '@/shared/actions';
import { createServer } from '@/shared/server';
import type { ChallengeUpdateInput } from '@/shared/types';
import { uploadCoverImage } from './upload-cover-image';
import { ERoutes } from '@/shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { challengeRepository } from '@/entities/challenge/server';
import { challengeSchemaWithId } from '@/entities/challenge';

export const updateChallengeAction = actionClient
  .inputSchema(challengeSchemaWithId)
  .action(async ({ parsedInput }): Promise<void> => {
    const supabase = await createServer();
    await getUser(supabase);

    const { id, title, description, coverImage, difficulty, categories } = parsedInput;
    const updatedData: ChallengeUpdateInput = { title, description, difficulty, categories };

    if (coverImage && coverImage.size > 0) {
      const { coverImageUrl, coverImagePath } = await uploadCoverImage({ supabase, coverImage, challengeId: id });
      updatedData.coverImageUrl = coverImageUrl;
      updatedData.coverImagePath = coverImagePath;
    }

    await challengeRepository.updateChallenge(id, updatedData);

    revalidatePath(ERoutes.CHALLENGES);
    revalidatePath(ERoutes.MY_CHALLENGES);
    revalidatePath(ERoutes.DISCOVER);

    redirect(ERoutes.MY_CHALLENGES);
  });
