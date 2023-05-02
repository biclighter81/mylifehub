import { signIn, useSession } from 'next-auth/react';
import useSWR from 'swr';
import { FetcherError, fetcher } from '../lib/fetcher';

export default function Home() {
  const { data: session, status } = useSession();
  if (status == 'unauthenticated') {
    signIn('keycloak');
  }

  const { data, isLoading, error } = useSWR<{ id: string }, FetcherError>(
    `routine`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {session && (
        <div>
          <h4>
            Hallo {session.given_name} {session.family_name}
          </h4>
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
    </>
  );
}
