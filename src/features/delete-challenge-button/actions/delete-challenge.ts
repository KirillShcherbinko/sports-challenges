import { challengeRepository } from './../../../entities/challenge/model/repository';
import { getUser } from "@/entities/auth/server";
import { ERoutes, idSchema } from "@/shared";
import { actionClient } from "@/shared/actions";
import { createServer } from "@/shared/server";
import { revalidatePath } from 'next/cache';

export const deleteChallengeAction = actionClient.inputSchema(idSchema).action(async ({ parsedInput: challengeId }) => {
  const supabase = await createServer();
  await getUser(supabase);

  const challenge = await challengeRepository.getChallengeById(challengeId);
  if (!challenge) {
    throw new Error('Челлендж не найден');
  }

  if (challenge.participantsCount > 0) {
    throw new Error('Нельзя удалять челлендж, в котором есть участники?');
  }

  const deletedChallenge = await challengeRepository.deleteChallenge(challengeId);

  revalidatePath(ERoutes.CHALLENGES);
  revalidatePath(ERoutes.MY_CHALLENGES);
  revalidatePath(ERoutes.DISCOVER);

  return deletedChallenge;
})