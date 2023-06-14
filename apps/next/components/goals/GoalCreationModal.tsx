import { IconX } from '@tabler/icons-react';
import { CreateGoal, Goal } from '../../lib/types/goal';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { KeyedMutator } from 'swr';

export default function GoalCreationModal({
  setActive,
  mutate,
}: {
  setActive: (active: boolean) => void;
  mutate: KeyedMutator<Goal[]>;
}) {
  const { data: session } = useSession();
  const [input, setInput] = useState<Partial<CreateGoal>>({
    unit: 'liters',
  });

  async function handleCreateGoal(input: CreateGoal) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goal`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.access_token,
        },
      });
      if (!res.ok) {
        throw new Error((await res.json()).message);
      }
      const data = await res.json();
      mutate((goals) => {
        if (!goals) return [data];
        data.completions = [];
        return [...goals, data];
      });
      setActive(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div
        className='absolute top-0 left-0 flex w-full h-full bg-black bg-opacity-20 items-center justify-center z-10'
        onClick={() => {
          setActive(false);
        }}
      >
        <div
          className='bg-white rounded-lg w-[700px] h-[500px] px-12 py-12 flex flex-col overflow-auto'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className='flex w-full'>
            <h2 className='text-xl text-gray-500 uppercase font-bold'>
              Create a Goal
            </h2>
            <div className='flex flex-grow justify-end'>
              <IconX
                className='text-gray-500 hover:cursor-pointer'
                onClick={() => {
                  setActive(false);
                }}
              />
            </div>
          </div>

          <div className='mt-4 flex flex-col space-y-4'>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Name</label>
              <input
                placeholder='Goal name...'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none'
                onChange={(e) => {
                  setInput({ ...input, name: e.target.value });
                }}
                value={input.name}
              ></input>
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Beschreibung</label>
              <textarea
                placeholder='Goal description...'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none resize-none'
                onChange={(e) => {
                  setInput({ ...input, description: e.target.value });
                }}
                value={input.description}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Goal Unit</label>
              <select
                className='outline-none bg-gray-200 px-4 py-3 rounded-md text-xs text-gray-600'
                onChange={(e) => {
                  setInput({ ...input, unit: e.target.value });
                }}
                value={input.unit}
              >
                <option value='liters'>Liters</option>
                <option value='kilometers'>Kilometers</option>
                <option value='meters'>Meters</option>
                <option value='minutes'>Minutes</option>
                <option value='hours'>Hours</option>
                <option value='reps'>Reps</option>
                <option value='calories'>Calories</option>
                <option value='steps'>Steps</option>
              </select>
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Step size</label>
              <input
                placeholder='The size your goal increases with one Click...'
                type='number'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none resize-none'
                onChange={(e) => {
                  setInput({ ...input, stepSize: parseInt(e.target.value) });
                }}
                value={input.stepSize}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Goal amount</label>
              <input
                placeholder='Goal amount...'
                type='number'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none resize-none'
                onChange={(e) => {
                  setInput({ ...input, goal: parseInt(e.target.value) });
                }}
                value={input.goal}
              />
            </div>
          </div>
          <div className='flex-grow flex justify-end items-end mt-4'>
            <button
              onClick={() => {
                const data = input as CreateGoal;
                handleCreateGoal(data);
              }}
              className='bg-primary-500 outline-none text-white uppercase font-bold px-8 py-2 rounded-md'
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
