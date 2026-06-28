import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import { isOlderThan24Hours } from '@/shared/lib/utils/is-older-than-24-hours';

const MS_24H = 24 * 60 * 60 * 1000;

describe('isOlderThan24Hours', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date('2026-06-28T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('any Date in the future → false', () => {
    fc.assert(
      fc.property(fc.date({ min: new Date('2026-06-28T12:00:00.001Z'), max: new Date('2030-01-01T00:00:00.000Z') }), (date) => {
        expect(isOlderThan24Hours(date)).toBe(false);
      }),
    );
  });

  it('any Date more than 24h in the past → true', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('2020-01-01T00:00:00.000Z'), max: new Date('2026-06-27T11:59:59.999Z') }),
        (date) => {
          expect(isOlderThan24Hours(date)).toBe(true);
        },
      ),
    );
  });

  it('exactly 24h ago → false (strictly greater)', () => {
    const exactly24hAgo = new Date(Date.now() - MS_24H);
    expect(isOlderThan24Hours(exactly24hAgo)).toBe(false);
  });

  it('24h + 1ms ago → true', () => {
    const justOver24hAgo = new Date(Date.now() - MS_24H - 1);
    expect(isOlderThan24Hours(justOver24hAgo)).toBe(true);
  });

  it('less than 24h ago → false', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: MS_24H - 1 }).map((offset) => new Date(Date.now() - offset)),
        (date) => {
          expect(isOlderThan24Hours(date)).toBe(false);
        },
      ),
    );
  });

  it('accepts string input and returns same result as Date', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('2020-01-01'), max: new Date('2026-06-28T12:00:00.000Z') }).filter((d) => !Number.isNaN(d.getTime())),
        (date) => {
          expect(isOlderThan24Hours(date.toISOString())).toBe(isOlderThan24Hours(date));
        },
      ),
    );
  });

  it('invalid date string → false (NaN comparison)', () => {
    fc.assert(
      fc.property(fc.string(), (str) => {
        fc.pre(!Date.parse(str) && str.length > 0);
        expect(isOlderThan24Hours(str)).toBe(false);
      }),
    );
  });
});
