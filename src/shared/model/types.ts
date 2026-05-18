import type { ERoutes } from '../routes/enums';

export type TResult<TData> = {
  success: boolean;
  data?: TData;
  error?: string;
  redirect?: ERoutes;
};

export type RetryOptions<TData> = {
  retries?: number;
  delayMs?: number;
  shouldRetry?: (result: TResult<TData>) => boolean;
};
