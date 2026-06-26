'use server';

import type { SupabaseClient, User } from '@supabase/supabase-js';

export const getUser = async (supabase: SupabaseClient): Promise<User> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  return user;
};
