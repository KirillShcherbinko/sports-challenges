import type z from 'zod';
import type { dailyTaskSchema } from './schemas';

export type TDailyTaskSchema = z.infer<typeof dailyTaskSchema>;
