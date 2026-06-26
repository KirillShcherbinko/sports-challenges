import type { TaskCompletionGetPayload } from '@/shared/types';

export type TTaskCompletionWithDailyTask = TaskCompletionGetPayload<{
  include: { dailyTask: true };
}>;
