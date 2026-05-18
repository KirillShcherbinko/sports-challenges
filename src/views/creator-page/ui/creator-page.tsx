import { ProfileInfo } from '@/widgets/profile-info/ui/profile-info';

type TCreatorPageProps = {
  params: { username: string };
};

export const CreatorPage = ({ params }: TCreatorPageProps) => {
  return <ProfileInfo profileUsername={params.username} />;
};
