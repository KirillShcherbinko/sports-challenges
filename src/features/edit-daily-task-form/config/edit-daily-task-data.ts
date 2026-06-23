import { dailyTaskSchema } from '@/entities/daily-task';
import { FitnessCategory } from '@/shared/types';

export const EDIT_DAILY_TASK_DATA = {
  schema: dailyTaskSchema,
  fields: {
    title: {
      label: 'Название',
      placeholder: 'Название ежедневного задания',
    },
    description: {
      label: 'Описание',
      placeholder: 'Правила выполнения задания',
      rows: 6,
    },
    exerciseType: {
      label: 'Тип упражнения',
      placeholder: 'На что направлено задание',
      searchable: true,
      clearable: true,
      maxDropdownHeight: 400,
    },
  },
  defaultValues: {
    title: '',
    description: '',
    exerciseType: FitnessCategory.Strength,
  },
};
