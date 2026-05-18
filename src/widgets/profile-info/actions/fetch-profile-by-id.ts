import { createServer } from '@/shared/lib/supabase/server';
import { getCachedProfileById } from './get-cached-profile-by-id';
import type { Profile } from '@/shared/generated/prisma/client';
import { EActionStatus, type TDataAction } from '@/shared';

export const fetchProfileById = async (): Promise<TDataAction<Profile>> => {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: EActionStatus.Error, error: 'Пользователь не найден' };
  }

  const result = await getCachedProfileById(user.id);
  if (!result.success || !result.data) {
    return { status: EActionStatus.Error, error: 'Не удалось получить данные пользователя' };
  }

  return { status: EActionStatus.Success, data: result.data };
};
