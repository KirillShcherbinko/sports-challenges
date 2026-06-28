import { ProfilePage } from '@/views/profile-page';

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function ProfileRoute({ searchParams }: Props) {
  const params = await searchParams;
  return <ProfilePage searchParams={params} />;
}
