import {
  IconChevronDown,
  IconChevronUp,
  IconCloudUpload,
  IconTrash,
} from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { Routine } from '../../lib/types/routine';
import CheckBox from './CheckBox';

export default function RoutineAccordion({
  routines,
}: {
  routines: Routine[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const [activeRoutines, setActiveRoutines] = useState<
    {
      id: string;
      checked: boolean;
    }[]
  >([]);

  return (
    <div className='flex flex-col space-y-4'>
      {routines.map((routine) => (
        <div key={routine.id}>
          <div
            className={`bg-gray-200 px-4 py-4 rounded-lg flex items-center space-x-4 ${
              active === routines.indexOf(routine) ? 'rounded-b-none' : ''
            }`}
          >
            <CheckBox
              id={routine.id}
              selected={activeRoutines}
              setSelected={setActiveRoutines}
            />
            <h5 className='text-md text-gray-500'>{routine.name}</h5>
            <div className='bg-blue-500 text-white font-bold uppercase px-2 py-1 rounded-xl text-xs'>
              Ca.{' '}
              {routine.stages.reduce(
                (acc, cur) => acc + cur.estimatedDuration,
                0
              )}{' '}
              Min
            </div>
            <p>
              {routine.description.length > 50
                ? routine.description.substring(0, 50) + '...'
                : routine.description}
            </p>

            <div className='flex-grow flex justify-end space-x-4'>
              <IconTrash className='text-red-500 hover:cursor-pointer' />
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
            className={`bg-gray-200 pr-4 pl-16 h-32 w-full flex flex-col space-y-4 rounded-b-lg ${
              active === routines.indexOf(routine) ? '' : 'hidden'
            }`}
          >
            <h4 className='text-gray-500 font-bold uppercase text-lg'>
              Sub-Stages
            </h4>
            {routine?.stages?.map((stage) => (
              <div key={stage.id} className='flex items-center space-x-4'>
                <div className='bg-blue-500 text-white font-bold uppercase px-2 py-1 rounded-xl text-xs'>
                  Ca. {stage.estimatedDuration} Min
                </div>
                <h5 className='text-md text-gray-500'>{stage.name}</h5>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
