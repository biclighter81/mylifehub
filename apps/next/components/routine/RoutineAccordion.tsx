import {
  IconChevronDown,
  IconChevronUp,
  IconCloudUpload,
  IconTrash,
} from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { Routine } from '../../lib/types/routine';
import CheckBox from '../interaction/CheckBox';
import { setRoutineStageState } from '../../lib/functions/routine';
import { KeyedMutator } from 'swr';
import { useSession } from 'next-auth/react';
import RoutineSubStageCreation from './RoutineSubStages';

export default function RoutineAccordion({
  routines,
  mutate,
}: {
  routines: Routine[];
  mutate: KeyedMutator<Routine[]>;
}) {
  const [active, setActive] = useState<number | null>(null);
  const { data: session } = useSession();

  async function handleActiveChange(id: string, active: boolean) {
    try {
      await setRoutineStageState(id, active);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/api/routine/' + id,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.access_token,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Error deleting routine');
      }
      mutate((routines) => {
        if (!routines) return [];
        return routines.filter((r) => r.id !== id);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='flex flex-col space-y-4'>
      {routines.map((routine) => (
        <div key={routine.id}>
          <div
            className={`bg-gray-200 px-4 py-4 rounded-lg flex items-center space-x-4 ${
              active === routines.indexOf(routine) ? 'rounded-b-none' : ''
            }`}
          >
            {/*<CheckBox
              id={routine.id}
              selected={activeRoutines}
              setSelected={setActiveRoutines}
              onChange={(id, checked) => {
                handleActiveChange(id, checked);
              }}
            />*/}
            <h5 className=' text-gray-500 font-bold'>{routine.name}</h5>
            <div className='bg-blue-500 text-white font-bold uppercase px-2 py-1 rounded-xl text-xs'>
              Ca.{' '}
              {routine.stages.reduce(
                (acc, cur) => acc + cur.estimatedDuration,
                0
              )}{' '}
              Min
            </div>
            <p className='text-sm text-gray-500'>
              {routine.description.length > 50
                ? routine.description.substring(0, 50) + '...'
                : routine.description}
            </p>

            <div className='flex-grow flex justify-end space-x-4'>
              <IconTrash
                className='text-red-500 hover:cursor-pointer'
                onClick={() => handleDelete(routine.id)}
              />
              <IconCloudUpload className='text-gray-500 hover:cursor-pointer' />
              {active === routines.indexOf(routine) ? (
                <IconChevronUp
                  className='text-gray-500 hover:cursor-pointer'
                  onClick={() => {
                    setActive(null);
                  }}
                />
              ) : (
                <IconChevronDown
                  className='text-gray-500 hover:cursor-pointer'
                  onClick={() => {
                    setActive(routines.indexOf(routine));
                  }}
                />
              )}
            </div>
          </div>
          <div
            className={`bg-gray-200 pr-4 pl-16 w-full flex flex-col space-y-4 rounded-b-lg pb-4 ${
              active === routines.indexOf(routine) ? '' : 'hidden'
            }`}
          >
            <RoutineSubStageCreation
              routineId={routine.id}
              stages={routine.stages}
              mutate={mutate}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
