type RetryOptions<T> = {
  retries?: number;
  delayMs?: number;
  shouldRetry?: (result: T) => boolean;
};

export async function retryResult<T>(fn: () => Promise<T>, options: RetryOptions<T> = {}): Promise<T> {
  const { retries = 3, delayMs = 300, shouldRetry = (result) => !result } = options;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fn();

      if (!shouldRetry(result) || attempt === retries) {
        return result;
      }
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
    }

    await new Promise((res) => setTimeout(res, delayMs * 2 ** attempt));
  }

  throw new Error('Не удалось волучить данные');
}
