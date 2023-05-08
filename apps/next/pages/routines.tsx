import PageHeader from '../components/app/PageHeader';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import { IconSearch } from '@tabler/icons-react';
import { Routine } from '../lib/types/routine';
import CheckBox from '../components/interaction/CheckBox';
import { useEffect, useState } from 'react';

export default function Routines() {
  const { data, error, isLoading } = useSWR<Routine[]>('routine', fetcher);
  const [checked, setChecked] = useState<{ id: string; checked: boolean }[]>(
    []
  );

  useEffect(() => {
    if (data) {
      setChecked(
        data.map((routine) => ({
          id: routine.id,
          checked: true,
        }))
      );
    }
  }, [data]);

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
        {data &&
          data.map((routine) => (
            <div
              key={routine.id}
              className='bg-gray-200 px-4 py-4 rounded-lg flex items-center space-x-4'
            >
              <CheckBox
                id={routine.id}
                selected={checked}
                setSelected={setChecked}
              />
              <h5 className='text-md text-gray-500'>{routine.name}</h5>
              <p>
                {routine.description.length > 50
                  ? routine.description.substring(0, 50) + '...'
                  : routine.description}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
