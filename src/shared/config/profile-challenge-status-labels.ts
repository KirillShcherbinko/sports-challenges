import { ProfileChallengeStatus } from '@/shared/generated/prisma/enums';

export const PROFILE_CHALLENGE_STATUS_LABELS: Record<ProfileChallengeStatus, string> = {
  [ProfileChallengeStatus.Active]: 'Активен',
  [ProfileChallengeStatus.Completed]: 'Завершён',
  [ProfileChallengeStatus.Failed]: 'Провален',
};
