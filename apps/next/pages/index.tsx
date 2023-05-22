import { signIn, useSession } from 'next-auth/react';
import useSWR from 'swr';
import { FetcherError, fetcher } from '../lib/fetcher';
import DailyWidget from "../components/Dashboard/DailyWidget";
import Headline from "../components/app/Headline";
import { UpcomingEvents } from "../lib/types/upcomingEvents";

export default function Home() {
  const { data: session, status } = useSession();
  if (status == 'unauthenticated') {
    signIn('keycloak');
  }

  const upcomingEvents: UpcomingEvents = {
    events: [
      {
        id: "0123",
        date: "2021-10-01",
        time: "11:00 - 13:00",
        name: "Meeting mit Max",
      },
      {
        id: "0124",
        date: "2021-10-03",
        time: "12:00 - 14:00",
        name: "Meeting mit Max",
      }
    ]
  }

  return (
    <>
      {session && (
        <div>
          <Headline text="Dashboard" level={1}/>
          <DailyWidget events={upcomingEvents.events}/>
        </div>
      )}
    </>
  );
}
