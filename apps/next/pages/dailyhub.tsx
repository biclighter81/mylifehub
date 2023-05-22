import { signIn, useSession } from 'next-auth/react';
import RoutinesBlock from './../components/DailyHub/RoutinesBlock';

export default function DailyHub() {
  const { data: session, status } = useSession();
  if (status == 'unauthenticated') {
    signIn('keycloak');
  }

  return (
    <>
      <RoutinesBlock/>
    </>
  );
}