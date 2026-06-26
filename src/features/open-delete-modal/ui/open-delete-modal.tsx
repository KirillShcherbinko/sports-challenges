'use client';

import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import type { ReactNode } from 'react';

type TOpenDeleteModalProps = {
  modalContent: (props: { close: () => void }) => ReactNode;
};

export const OpenDeleteModal = ({ modalContent }: TOpenDeleteModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="subtle" color="red" onClick={open}>
        <IconTrash size={18} />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Удаление задания">
        {modalContent({ close })}
      </Modal>
    </>
  );
};
