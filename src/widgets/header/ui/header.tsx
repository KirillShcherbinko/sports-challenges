import { Suspense } from 'react';
import { HeaderInner } from './header-inner';
import { HeaderProfile } from './header-profile';
import { HeaderProfileSkeleton } from './header-profile-skeleton';

export const Header = () => {
  return (
    <HeaderInner
      profileSlot={
        <Suspense fallback={<HeaderProfileSkeleton />}>
          <HeaderProfile />
        </Suspense>
      }
    />
  );
};
