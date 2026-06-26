import { FitnessCategory } from '@/shared/generated/prisma/enums';
import { FITNESS_CATEGORY_LABELS } from './fitness-category-labels';

const FITNESS_CATEGORY_GROUPS = [
  {
    group: 'Базовые',
    categories: [
      FitnessCategory.Strength,
      FitnessCategory.Cardio,
      FitnessCategory.Flexibility,
      FitnessCategory.Endurance,
    ],
  },
  {
    group: 'Физическая подготовка',
    categories: [
      FitnessCategory.Mobility,
      FitnessCategory.Balance,
      FitnessCategory.Speed,
      FitnessCategory.Agility,
      FitnessCategory.Power,
      FitnessCategory.WeightLoss,
      FitnessCategory.MuscleGain,
    ],
  },
  {
    group: 'Здоровье и образ жизни',
    categories: [
      FitnessCategory.Nutrition,
      FitnessCategory.Hydration,
      FitnessCategory.Sleep,
      FitnessCategory.Recovery,
      FitnessCategory.MentalHealth,
      FitnessCategory.Mindfulness,
      FitnessCategory.DailySteps,
      FitnessCategory.Posture,
    ],
  },
  {
    group: 'Спортивные дисциплины',
    categories: [
      FitnessCategory.Yoga,
      FitnessCategory.Calisthenics,
      FitnessCategory.Running,
      FitnessCategory.Cycling,
      FitnessCategory.Swimming,
      FitnessCategory.Dance,
      FitnessCategory.MartialArts,
    ],
  },
];

export const FITNESS_CATEGORY_DATA = FITNESS_CATEGORY_GROUPS.map(({ group, categories }) => ({
  group,
  items: categories.map((category) => ({
    value: category,
    label: FITNESS_CATEGORY_LABELS[category],
  })),
}));
