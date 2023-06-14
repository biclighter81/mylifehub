import {
  IconFlame,
  IconPencil,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import GoalEditModal from '../components/goals/GoalEditModal';
import GoalCreationModal from '../components/goals/GoalCreationModal';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import { Goal } from '../lib/types/goal';
import { useSession } from 'next-auth/react';

export default function Goals() {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const [edit, setEdit] = useState<undefined | string>(undefined);
  const [create, setCreate] = useState<boolean>(false);

  const { data: session } = useSession();

  const { data, isLoading, mutate } = useSWR<Goal[]>('goal', fetcher);

  async function handleDelete(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/goal/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.access_token,
          },
        }
      );
      if (!res.ok) {
        throw new Error((await res.json()).message);
      }
      mutate((goals) => {
        if (!goals) return [];
        return goals.filter((goal) => goal.id !== id);
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {edit && <GoalEditModal setActive={setEdit} id={edit} />}
      {create && <GoalCreationModal setActive={setCreate} mutate={mutate} />}
      <div className='grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {data?.map((item) => (
          <div className='bg-gray-200 rounded-md px-12 py-12 flex items-center justify-center flex-col relative overflow-hidden'>
            <div className='bg-yellow-500 absolute top-0 right-0 h-10 w-10 rounded-lg -mr-4 -mt-4 hover:-mr-0 hover:-mt-0  duration-300 ease-in-out transition-all flex items-center justify-center'>
              <IconPencil
                size={24}
                className='text-white cursor-pointer opacity-0 hover:opacity-100 transition-all duration-300'
                onClick={() => setEdit(item.id)}
              />
            </div>
            <div className='bg-red-500 absolute bottom-0 right-0 h-10 w-10 rounded-lg -mr-4 -mb-4 hover:-mr-0 hover:-mb-0  duration-300 ease-in-out transition-all flex items-center justify-center'>
              <IconTrash
                size={24}
                className='text-white cursor-pointer opacity-0 hover:opacity-100 transition-all duration-300'
                onClick={() => handleDelete(item.id)}
              />
            </div>
            <p className='text-gray-600 font-bold text-xl'>{item.name}</p>
            <p className='text-gray-600 text-xs'>
              {item.goal} {item.unit}
            </p>

            <div className='flex space-x-4 items-center mt-4'>
              <div className='flex flex-col items-center'>
                <IconFlame className='text-blue-500' />
                <p className='text-[0.5rem] uppercase text-blue-500 font-medium'>
                  up since
                </p>
              </div>
              <p className='font-bold text-primary-500 text-lg'>
                {item.completions.length} Days
              </p>
            </div>
          </div>
        ))}
        <div className='bg-gray-200 flex items-center justify-center flex-col px-12 py-12 rounded-md'>
          <IconPlus
            size={48}
            className='text-primary-500 hover:scale-110 cursor-pointer transition duration-300 ease-in-out'
            onClick={() => setCreate(true)}
          />
          <p className='uppercase text-primary-500 font-medium'>Add Goal</p>
        </div>
      </div>
    </div>
  );
}
