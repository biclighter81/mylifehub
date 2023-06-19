import { IconX } from '@tabler/icons-react';
import { KeyedMutator } from 'swr';
import { CreateGoal, Goal } from '../../lib/types/goal';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function GoalEditModal({
  setActive,
  goal,
  mutate,
}: {
  setActive: (active: string | undefined) => void;
  goal: Goal | undefined;
  mutate: KeyedMutator<Goal[]>;
}) {
  const [input, setInput] = useState<Partial<CreateGoal>>({ ...goal });
  const { data: session } = useSession();

  async function handleEditGoal(input: CreateGoal) {
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
        return [...goals.filter((g) => g.id !== data.id), data];
      }, false);
      setActive(undefined);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div
        className='absolute top-0 left-0 flex w-full h-full bg-black bg-opacity-20 items-center justify-center z-10'
        onClick={() => {
          setActive(undefined);
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
              Edit your Goal
            </h2>
            <div className='flex flex-grow justify-end'>
              <IconX
                className='text-gray-500 hover:cursor-pointer'
                onClick={() => {
                  setActive(undefined);
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
                <option value='count'>Count</option>
                <option value='boolean'>Boolean</option>
                <option value='other'>Other</option>
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
                handleEditGoal(data);
              }}
              className='bg-primary-500 outline-none text-white uppercase font-bold px-8 py-2 rounded-md'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
