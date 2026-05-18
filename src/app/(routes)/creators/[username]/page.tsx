import { CreatorPage } from '@/views/creator-page';

type TCreatorRouteProps = {
  params: Promise<{ username: string }>;
};

export default async function CreatorRoute({ params }: TCreatorRouteProps) {
  const resolvedParams = await params;
  return <CreatorPage params={resolvedParams} />;
}
