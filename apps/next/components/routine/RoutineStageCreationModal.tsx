import { IconX } from '@tabler/icons-react';
import { CreateStageInput, Routine } from '../../lib/types/routine';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { KeyedMutator } from 'swr';

export default function RoutineStageCreationModal({
  setModal,
  routineId,
  mutate,
}: {
  setModal: (modal: boolean) => void;
  routineId: string;
  mutate: KeyedMutator<Routine[]>;
}) {
  const [input, setInput] = useState<Partial<CreateStageInput>>({});
  const { data: session } = useSession();
  async function handleCreateStage(input: CreateStageInput) {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/api/routine/stages/' + routineId,
        {
          method: 'POST',
          body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.access_token,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      mutate((routines) => {
        if (!routines) return routines;
        const routine = routines.find((r) => r.id === routineId);
        if (!routine) return routines;
        routine.stages.push(data);
        return [...routines.filter((r) => r.id !== routineId), routine];
      }, false);

      setModal(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div
        className='absolute top-0 left-0 flex w-full h-full bg-black bg-opacity-20 items-center justify-center'
        onClick={() => {
          setModal(false);
        }}
      >
        <div
          className='bg-white rounded-lg w-[700px] h-[500px] px-12 py-12 flex flex-col'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className='flex w-full justify-end'>
            <IconX
              className='text-gray-500 hover:cursor-pointer'
              onClick={() => {
                setModal(false);
              }}
            />
          </div>
          <h2 className='text-xl text-gray-500 uppercase font-bold'>
            Create a Routine Sub-Stage
          </h2>
          <div className='mt-4 flex flex-col space-y-4'>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Name</label>
              <input
                placeholder='Stage name...'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none'
                onChange={(e) => {
                  setInput({ ...input, name: e.target.value });
                }}
                value={input.name}
              ></input>
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Description</label>
              <textarea
                placeholder='Stage description...'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none'
                onChange={(e) => {
                  setInput({ ...input, description: e.target.value });
                }}
                value={input.description}
              ></textarea>
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>
                Estimated duration
              </label>
              <input
                type='number'
                placeholder='Stage duration...'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none'
                onChange={(e) => {
                  setInput({
                    ...input,
                    estimatedDuration: parseInt(e.target.value),
                  });
                }}
                value={input.estimatedDuration}
              ></input>
            </div>
          </div>
          <div className='flex-grow flex justify-end items-end'>
            <button
              onClick={() => {
                const data = input as CreateStageInput;
                handleCreateStage(data);
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
