import type { FitnessLevel } from "@/shared/generated/prisma/enums";

export const FITNESS_LEVEL_LABELS: Record<FitnessLevel, string> = {
  beginner: 'Новичок',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};