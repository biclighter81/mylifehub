import PageHeader from '../components/app/PageHeader';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import { IconSearch } from '@tabler/icons-react';
import { Routine } from '../lib/types/routine';
import RoutineAccordion from '../components/interaction/RoutineAccordion';

export default function Routines() {
  const { data, error, isLoading } = useSWR<Routine[]>('routine', fetcher);

  return (
    <>
      <PageHeader title='Routines' subtitle='Manage your routines!' />
      <div className='bg-gray-200 w-full flex items-center px-4 rounded-lg space-x-4'>
        <IconSearch className='text-gray-600 h-5 w-5' />
        <input
          type='text'
          className='flex-grow rounded py-3 bg-gray-200 placeholder-gray-600 outline-none border-none fill-none text-sm text-gray-600'
          placeholder='Discover routines...'
        ></input>
      </div>
      <div className='mt-4 flex flex-col'>
        {data && <RoutineAccordion routines={data} />}
      </div>
    </>
  );
}
