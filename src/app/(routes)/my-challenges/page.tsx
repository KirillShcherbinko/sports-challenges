import { MyChallengesPage } from '@/views/my-challenges-page';

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function MyChallengesRoute({ searchParams }: Props) {
  const params = await searchParams;
  return <MyChallengesPage searchParams={params} />;
}
