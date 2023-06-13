import { signIn, useSession } from 'next-auth/react';
import useSWR from 'swr';
import { FetcherError, fetcher } from '../lib/fetcher';
import { Routine } from '../lib/types/routine';
import RoutineDashboard from '../components/routine/RoutineDashboard';

export default function Home() {
  const { data: session, status } = useSession();
  if (status == 'unauthenticated') {
    signIn('keycloak');
  }

  const { data, isLoading, error, mutate } = useSWR<Routine[], FetcherError>(
    `routine`,
    fetcher,
    {
      revalidateOnMount: true,
      keepPreviousData: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {session && (
        <div>
          <h4 className='font-bold text-gray-600 text-2xl'>
            Hello {session.given_name},
          </h4>
          <p className='text-xs -mt-1'>
            these are the next tasks and routines of your day!
          </p>
          {data && <RoutineDashboard data={data} mutate={mutate} />}
        </div>
      )}
    </>
  );
}
