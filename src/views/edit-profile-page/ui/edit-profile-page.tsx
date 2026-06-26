import { EditProfileContent } from '@/widgets/edit-profile-content';
import { Center, Loader } from '@mantine/core';
import { Suspense } from 'react';

export const EditProfilePage = async () => {
  return (
    <Suspense
      fallback={
        <Center h={300}>
          <Loader />
        </Center>
      }
    >
      <EditProfileContent />
    </Suspense>
  );
};
