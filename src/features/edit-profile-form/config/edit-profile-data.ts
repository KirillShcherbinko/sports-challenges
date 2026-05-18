import { editProfileSchema } from '@/entities/profile';
import { FitnessLevel } from '@/shared/types';

export const FITNESS_LEVEL_OPTIONS = [
  {
    value: FitnessLevel.beginner,
    label: 'Новичок',
  },

  {
    value: FitnessLevel.intermediate,
    label: 'Средний',
  },

  {
    value: FitnessLevel.advanced,
    label: 'Продвинутый',
  },
];

export const EDIT_PROFILE_DATA = {
  schema: editProfileSchema,

  defaultValues: {
    username: '',
    bio: '',
    fitnessLevel: FitnessLevel.beginner,
    avatar: null,
  },

  fields: {
    username: {
      required: true,
      label: 'Имя пользователя',
      placeholder: 'Введите username',
    },

    bio: {
      label: 'О себе',
      placeholder: 'Расскажите о себе',
      autosize: true,
      minRows: 4,
      maxRows: 8,
    },

    fitnessLevel: {
      label: 'Уровень подготовки',
      data: FITNESS_LEVEL_OPTIONS,
    },

    avatar: {
      accept: 'image/png,image/jpeg',
      description: 'PNG или JPG',
    },
  },
};
