import { editProfileSchema } from '@/entities/profile';

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
    },

    preferences: {
      label: 'Индивидуальные предпочтения',
      placeholder: 'Введите ваши интересы',
      searchable: true,
      clearable: true,
      maxDropdownHeight: 400,
    },

    avatar: {
      accept: 'image/png,image/jpeg',
    },
  },
};
