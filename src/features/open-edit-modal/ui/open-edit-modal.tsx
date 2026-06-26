'use client';

import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';
import type { ReactNode } from 'react';

type TOpenEditModalProps = {
  modalContent: (props: { close: () => void }) => ReactNode;
};

export const OpenEditModal = ({ modalContent }: TOpenEditModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="subtle" color="gray" onClick={open}>
        <IconPencil size={18} />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Редактирование задания">
        {modalContent({ close })}
      </Modal>
    </>
  );
};
