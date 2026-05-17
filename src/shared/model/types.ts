export type TResult<TData> = {
  success: boolean;
  data?: TData;
  error?: string;
};

export type RetryOptions<TData> = {
  retries?: number;
  delayMs?: number;
  shouldRetry?: (result: TResult<TData>) => boolean;
};
