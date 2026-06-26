'use client';

import { Button, Stack } from '@mantine/core';
import { useState } from 'react';
import { TaskCompletionCard } from '@/entities/task-completion';
import type { TTaskCompletionDto } from '@/entities/task-completion';

type TTaskCompletionsListContentProps = {
  items: TTaskCompletionDto[];
};

const INITIAL_VISIBLE_COUNT = 4;

export const TaskCompletionsListContent = ({ items }: TTaskCompletionsListContentProps) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMoreItems = items.length > INITIAL_VISIBLE_COUNT;

  return (
    <Stack>
      {visibleItems.map((completion) => (
        <TaskCompletionCard
          key={completion.id}
          isCompleted={completion.isCompleted}
          completedAt={completion.completedAt?.toISOString() ?? null}
          title={completion.dailyTask.title}
          dayNumber={completion.dailyTask.dayNumber}
        />
      ))}

      {hasMoreItems && !showAll && (
        <Button variant="subtle" onClick={() => setShowAll(true)}>
          Показать всё ({items.length})
        </Button>
      )}

      {showAll && hasMoreItems && (
        <Button variant="subtle" onClick={() => setShowAll(false)}>
          Показать меньше
        </Button>
      )}
    </Stack>
  );
};
