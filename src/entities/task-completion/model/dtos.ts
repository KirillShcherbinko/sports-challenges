export type TTaskCompletionDto = {
  id: string;
  isCompleted: boolean;
  completedAt: Date | null;
  dailyTask: {
    title: string;
    dayNumber: number;
  };
};

export type TTaskCompletionMutationDto = {
  id: string;
  dailyTask: {
    title: string;
    dayNumber: number;
  };
};
