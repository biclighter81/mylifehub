import PageHeader from '../components/app/PageHeader';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Routine } from '../lib/types/routine';
import RoutineAccordion from '../components/routine/RoutineAccordion';
import Spinner from '../components/app/Spinner';
import RoutineCreationModal from '../components/routine/RoutineCreationModal';
import { useState } from 'react';

export default function Routines() {
  const { data, error, isLoading, mutate } = useSWR<Routine[]>(
    'routine',
    fetcher
  );
  const [modal, setModal] = useState(false);
  return (
    <>
      <PageHeader title='Routines' subtitle='Manage your routines!' />
      {modal && <RoutineCreationModal mutate={mutate} setActive={setModal} />}
      <div className='flex space-x-3'>
        <div className='bg-gray-200 w-full flex items-center px-4 rounded-lg space-x-4'>
          <IconSearch className='text-gray-600 h-5 w-5' />
          <input
            type='text'
            className='flex-grow rounded py-3 bg-gray-200 placeholder-gray-600 outline-none border-none fill-none text-sm text-gray-600'
            placeholder='Discover routines...'
          ></input>
        </div>
        <button
          className='bg-gray-200 rounded-lg px-4'
          onClick={(e) => setModal(true)}
        >
          <IconPlus className='text-blue-500' strokeWidth={2} />
        </button>
      </div>
      <div className='mt-4 flex flex-col'>
        {isLoading && (
          <div className='flex items-center justify-center'>
            <Spinner />
          </div>
        )}
        {data && <RoutineAccordion mutate={mutate} routines={data} />}
      </div>
    </>
  );
}
