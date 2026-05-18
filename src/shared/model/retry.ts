import type { TResult, RetryOptions } from './types';

export async function retryResult<T>(
  fn: () => Promise<TResult<T>>,
  options: RetryOptions<T> = {}
): Promise<TResult<T>> {
  const { retries = 3, delayMs = 300, shouldRetry = (result) => !result.success } = options;

  let lastResult: TResult<T> = {
    success: false,
    error: 'Попыток не выполнено',
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    const result = await fn();
    lastResult = result;

    const isLastAttempt = attempt === retries;

    if (result.success || isLastAttempt || !shouldRetry(result)) {
      return result;
    }

    await new Promise((res) => setTimeout(res, delayMs * 2 ** attempt));
  }

  return lastResult;
}
