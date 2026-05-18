import { type TDataAction, EActionStatus } from '@/shared';
import { getCachedProfileByUsername } from './get-cached-profile-by-username';
import type { Profile } from '@/shared/generated/prisma/client';

export const fetchProfileByUsername = async (username: string): Promise<TDataAction<Profile>> => {
  const result = await getCachedProfileByUsername(username);
  if (!result.success || !result.data) {
    return {
      status: EActionStatus.Error,
      error: 'Не удалось получить данные',
    };
  }

  return {
    status: EActionStatus.Success,
    data: result.data,
  };
};
