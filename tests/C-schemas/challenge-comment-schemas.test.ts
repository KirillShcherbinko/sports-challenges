import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import {
  challengeCommentSchema,
  challengeCommentSchemaWithChallengeId,
  challengeCommentSchemaWithCommentId,
} from '@/entities/challenge-comment/model/schemas';

const commentArbitrary = fc
  .string({ minLength: 1, maxLength: 200 })
  .filter((s) => s.trim().length >= 1);

const longString = (min: number, max: number) =>
  fc.string({ minLength: min, maxLength: max }).filter((s) => s.trim().length >= min);

describe('challengeCommentSchema', () => {
  it('accepts valid comment content (1-200 chars)', () => {
    fc.assert(
      fc.property(commentArbitrary, (content) => {
        const result = challengeCommentSchema.parse({ content });
        expect(result.content).toBe(content.trim());
      }),
    );
  });

  it('rejects empty content', () => {
    expect(() => challengeCommentSchema.parse({ content: '' })).toThrow();
  });

  it('rejects content longer than 200 characters', () => {
    fc.assert(
      fc.property(longString(201, 300), (content) => {
        expect(() => challengeCommentSchema.parse({ content })).toThrow();
      }),
    );
  });
});

describe('challengeCommentSchemaWithChallengeId', () => {
  it('accepts valid comment with challenge id', () => {
    fc.assert(
      fc.property(
        commentArbitrary,
        fc.uuid(),
        (content, challengeId) => {
          const result = challengeCommentSchemaWithChallengeId.parse({
            content,
            challengeId,
          });
          expect(result.content).toBe(content.trim());
          expect(result.challengeId).toBe(challengeId.toLowerCase());
        },
      ),
    );
  });

  it('rejects empty challenge id', () => {
    expect(() =>
      challengeCommentSchemaWithChallengeId.parse({
        content: 'Great challenge!',
        challengeId: '',
      }),
    ).toThrow();
  });
});

describe('challengeCommentSchemaWithCommentId', () => {
  it('accepts valid comment with comment id', () => {
    fc.assert(
      fc.property(
        commentArbitrary,
        fc.uuid(),
        (content, commentId) => {
          const result = challengeCommentSchemaWithCommentId.parse({
            content,
            commentId,
          });
          expect(result.content).toBe(content.trim());
          expect(result.commentId).toBe(commentId.toLowerCase());
        },
      ),
    );
  });

  it('rejects empty comment id', () => {
    expect(() =>
      challengeCommentSchemaWithCommentId.parse({
        content: 'Great challenge!',
        commentId: '',
      }),
    ).toThrow();
  });
});
