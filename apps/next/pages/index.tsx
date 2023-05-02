import { signIn, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  if (status == 'unauthenticated') {
    signIn('keycloak');
  }
  return <></>;
}
