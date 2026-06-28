'use client';

import { IconPencil, IconTrash } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { OpenDeleteModal } from '@/features/open-delete-modal';
import { DeleteChallengeModalContent } from './delete-challenge-modal-content';

export const ChallengeDeleteActions = () => {
  return (
    <>
      <OpenDeleteModal
        modalContent={({ close }) => <DeleteChallengeModalContent onClose={close} />}
      />
    </>
  );
};
