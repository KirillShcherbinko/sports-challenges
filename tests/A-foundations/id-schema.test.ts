import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { idSchema } from '@/shared/model/schemas';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe('idSchema', () => {
  it('rejects empty string', () => {
    expect(() => idSchema.parse('')).toThrow('Некорректный ID');
  });

  it('accepts valid UUID', () => {
    fc.assert(
      fc.property(fc.uuid(), (value) => {
        expect(() => idSchema.parse(value)).not.toThrow();
      }),
    );
  });

  it('rejects non-UUID strings', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => !uuidRegex.test(s)),
        (value) => {
          expect(() => idSchema.parse(value)).toThrow('Некорректный ID');
        },
      ),
    );
  });
});
