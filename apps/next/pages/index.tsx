import { signIn, useSession } from 'next-auth/react';
import useSWR from 'swr';
import { FetcherError, fetcher } from '../lib/fetcher';
import { Routine } from '../lib/types/routine';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  if (status == 'unauthenticated') {
    signIn('keycloak');
  }

  const { data, isLoading, error } = useSWR<Routine[], FetcherError>(
    `routine`,
    fetcher
  );

  const routines = useMemo(() => {
    if (!data) return [];
    const truncStr = dayjs().format('YYYY-MM-DD');
    const routines = data.map((routine) => {
      const next = dayjs(
        truncStr + routine.preferredTime.replace(' Uhr', '')
      ).unix();
      return {
        ...routine,
        next,
      };
    });
    return routines.sort((a, b) => a.next - b.next);
  }, [data]);

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
          <div className='flex flex-col mt-8 space-y-4'>
            {routines.map((routine) => (
              <div
                key={routine.id}
                className='bg-gray-200 px-8 py-4 rounded-md'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-2'>
                      <div className='text-gray-600 text-sm'>
                        {routine.preferredTime}
                      </div>
                      <div className='text-gray-600 text-sm'>
                        {routine.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
