import { challengeSchema } from '@/entities/challenge';
import { ChallengeDifficulty, FitnessCategory } from '@/shared/types';

export const EDIT_CHALLENGE_DATA = {
  schema: challengeSchema,
  fields: {
    title: {
      label: 'Название',
      placeholder: 'Введите название челленджа',
    },

    description: {
      label: 'Описание',
      placeholder: 'Расскажите о челлендже',
      rows: 6,
    },

    coverImage: {
      label: 'Обложка',
      placeholder: 'Выберите подходящее изображение',
      clearable: true,
      accept: 'image/png,image/jpeg',
    },

    difficulty: {
      label: 'Уровень сложности',
    },

    categories: {
      label: 'Категории',
      placeholder: 'Введите навыки, которые развивает челлендж',
      searchable: true,
      clearable: true,
      maxDropdownHeight: 400,
    },
  },
  defaultValues: {
    title: '',
    description: '',
    coverImageUrl: null,
    difficulty: ChallengeDifficulty.Medium,
    categories: [FitnessCategory.Strength],
  },
};
