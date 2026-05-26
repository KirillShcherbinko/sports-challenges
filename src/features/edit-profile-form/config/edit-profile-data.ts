import { editProfileSchema } from '@/entities/profile';
import { FITNESS_LEVEL_OPTIONS } from './fitness-level-options';

export const EDIT_PROFILE_DATA = {
  schema: editProfileSchema,
  fields: {
    username: {
      label: 'Имя пользователя',
      placeholder: 'Введите username',
    },

    bio: {
      label: 'О себе',
      placeholder: 'Расскажите о себе',
      rows: 6,
    },

    fitnessLevel: {
      label: 'Уровень подготовки',
      data: FITNESS_LEVEL_OPTIONS,
    },

    preferences: {
      label: 'Индивидуальные предпочтения',
      placeholder: 'Введите ваши интересы',
    },

    avatar: {
      accept: 'image/png,image/jpeg',
    },
  },
};
