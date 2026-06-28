import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import { retryResult } from '@/shared/lib/utils/retry';

describe('retryResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns result immediately when shouldRetry returns false', async () => {
    await fc.assert(
      fc.asyncProperty(fc.anything(), async (value) => {
        const fn = vi.fn<() => Promise<unknown>>().mockResolvedValue(value);
        const result = await retryResult(fn, { retries: 3, shouldRetry: () => false });
        expect(result).toBe(value);
        expect(fn).toHaveBeenCalledTimes(1);
      }),
    );
  });

  it('retries up to retries times on falsy result, then returns final value', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: 5 }),
        fc.anything(),
        async (retries, finalValue) => {
          let callCount = 0;
          const fn = vi.fn<() => Promise<unknown>>().mockImplementation(async () => {
            callCount++;
            if (callCount <= retries) return null;
            return finalValue;
          });

          const promise = retryResult(fn, { retries, delayMs: 10, shouldRetry: (r) => !r });
          await vi.runAllTimersAsync();
          const result = await promise;

          expect(result).toBe(finalValue);
          expect(fn).toHaveBeenCalledTimes(retries + 1);
        },
      ),
    );
  });

  it('exhausts retries and returns last falsy result (does not throw)', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: 5 }),
        async (retries) => {
          const fn = vi.fn<() => Promise<null>>().mockResolvedValue(null);

          const promise = retryResult(fn, { retries, delayMs: 10, shouldRetry: (r) => !r });
          await vi.runAllTimersAsync();
          const result = await promise;

          expect(result).toBeNull();
          expect(fn).toHaveBeenCalledTimes(retries + 1);
        },
      ),
    );
  });

  it('exponential backoff: delay increases with attempts', async () => {
    const delays: number[] = [];
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    const fn = vi.fn<() => Promise<null>>().mockResolvedValue(null);

    const promise = retryResult(fn, { retries: 3, delayMs: 100, shouldRetry: (r) => !r });
    await vi.runAllTimersAsync();
    await promise;

    for (const call of setTimeoutSpy.mock.calls) {
      delays.push(call[1] as number);
    }

    expect(delays).toHaveLength(3);
    expect(delays[0]).toBe(100);
    expect(delays[1]).toBe(200);
    expect(delays[2]).toBe(400);
  });

  it('default options: retries=3, delayMs=300, shouldRetry checks falsy', async () => {
    const fn = vi.fn<() => Promise<null>>().mockResolvedValue(null);

    const promise = retryResult(fn);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBeNull();
    expect(fn).toHaveBeenCalledTimes(4);
  });
});

describe('retryResult - throwing functions', () => {
  it('throws when fn throws on every attempt', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: 5 }),
        fc.string(),
        async (retries, errorMessage) => {
          const fn = vi.fn<() => Promise<unknown>>().mockImplementation(async () => {
            throw new Error(errorMessage);
          });

          await expect(
            retryResult(fn, { retries, delayMs: 1 }),
          ).rejects.toThrow(errorMessage);
          expect(fn).toHaveBeenCalledTimes(retries + 1);
        },
      ),
    );
  });

  it('recovers from temporary throws', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 4 }),
        fc.oneof(fc.integer(), fc.string()),
        async (failCount, finalValue) => {
          let callCount = 0;
          const fn = vi.fn<() => Promise<unknown>>().mockImplementation(async () => {
            callCount++;
            if (callCount <= failCount) throw new Error('temp fail');
            return finalValue;
          });

          const result = await retryResult(fn, { retries: failCount, delayMs: 1, shouldRetry: () => false });
          expect(result).toBe(finalValue);
          expect(fn).toHaveBeenCalledTimes(failCount + 1);
        },
      ),
    );
  });
});
