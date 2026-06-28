import { HomePage } from '@/views/home-page';

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function HomeRoute({ searchParams }: Props) {
  const params = await searchParams;
  return <HomePage searchParams={params} />;
}
