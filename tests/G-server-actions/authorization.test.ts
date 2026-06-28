import { describe, expect, it, vi, beforeEach } from 'vitest';
import { assertChallengeOwner, assertCommentOwner } from '@/shared/lib/auth/authorize';
import { prisma } from '@/shared/server';

vi.mock('@/shared/server', () => ({
  prisma: {
    challenge: {
      findUnique: vi.fn(),
    },
    challengeComment: {
      findUnique: vi.fn(),
    },
  },
  createServer: vi.fn(),
}));

const mockUserId = 'user-123';
const otherUserId = 'user-456';
const challengeId = 'challenge-1';
const commentId = 'comment-1';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('assertChallengeOwner', () => {
  it('passes when user is the creator', async () => {
    vi.mocked(prisma.challenge.findUnique).mockResolvedValue({ creatorId: mockUserId });

    await expect(assertChallengeOwner(challengeId, mockUserId)).resolves.toBeUndefined();
    expect(prisma.challenge.findUnique).toHaveBeenCalledWith({
      where: { id: challengeId },
      select: { creatorId: true },
    });
  });

  it('throws when challenge is not found', async () => {
    vi.mocked(prisma.challenge.findUnique).mockResolvedValue(null);

    await expect(assertChallengeOwner(challengeId, mockUserId)).rejects.toThrow('Челлендж не найден');
  });

  it('throws when user is not the creator', async () => {
    vi.mocked(prisma.challenge.findUnique).mockResolvedValue({ creatorId: otherUserId });

    await expect(assertChallengeOwner(challengeId, mockUserId)).rejects.toThrow(
      'Вы не можете редактировать чужой челлендж',
    );
  });
});

describe('assertCommentOwner', () => {
  it('passes when user is the author', async () => {
    vi.mocked(prisma.challengeComment.findUnique).mockResolvedValue({ profileId: mockUserId });

    await expect(assertCommentOwner(commentId, mockUserId)).resolves.toBeUndefined();
    expect(prisma.challengeComment.findUnique).toHaveBeenCalledWith({
      where: { id: commentId },
      select: { profileId: true },
    });
  });

  it('throws when comment is not found', async () => {
    vi.mocked(prisma.challengeComment.findUnique).mockResolvedValue(null);

    await expect(assertCommentOwner(commentId, mockUserId)).rejects.toThrow('Комментарий не найден');
  });

  it('throws when user is not the author', async () => {
    vi.mocked(prisma.challengeComment.findUnique).mockResolvedValue({ profileId: otherUserId });

    await expect(assertCommentOwner(commentId, mockUserId)).rejects.toThrow(
      'Вы не можете редактировать чужой комментарий',
    );
  });
});
