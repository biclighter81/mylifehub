import { IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CreateRoutineInput, Routine } from '../../lib/types/routine';
import { useState } from 'react';
import { KeyedMutator } from 'swr';

export default function RoutineCreationModal({
  setActive,
  mutate,
}: {
  setActive: (active: boolean) => void;
  mutate: KeyedMutator<Routine[]>;
}) {
  const { data: session } = useSession();
  const [input, setInput] = useState<Partial<CreateRoutineInput>>({
    preferredTime: '6:00 Uhr',
  });
  const router = useRouter();

  async function handleCreateRoutine(input: CreateRoutineInput) {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/api/routine',
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
      setActive(false);
      mutate((routines) => {
        if (!routines) return [data];
        return [...routines, data];
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div
        className='absolute top-0 left-0 flex w-full h-full bg-black bg-opacity-20 items-center justify-center'
        onClick={() => {
          setActive(false);
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
                setActive(false);
              }}
            />
          </div>
          <h2 className='text-xl text-gray-500 uppercase font-bold'>
            Create a Routine
          </h2>
          <div className='mt-4 flex flex-col space-y-4'>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Name</label>
              <input
                placeholder='Routine name...'
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
                placeholder='Routine description...'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none resize-none'
                onChange={(e) => {
                  setInput({ ...input, description: e.target.value });
                }}
                value={input.description}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Empfohlene Zeit</label>
              <select
                className='outline-none bg-gray-200 px-4 py-3 rounded-md text-xs text-gray-600'
                onChange={(e) => {
                  setInput({ ...input, preferredTime: e.target.value });
                }}
                value={input.preferredTime}
              >
                <option value='1:00 Uhr'>1:00 Uhr</option>
                <option value='2:00 Uhr'>2:00 Uhr</option>
                <option value='3:00 Uhr'>3:00 Uhr</option>
                <option value='4:00 Uhr'>4:00 Uhr</option>
                <option value='5:00 Uhr'>5:00 Uhr</option>
                <option value='6:00 Uhr' selected>
                  6:00 Uhr
                </option>
                <option value='7:00 Uhr'>7:00 Uhr</option>
                <option value='8:00 Uhr'>8:00 Uhr</option>
                <option value='9:00 Uhr'>9:00 Uhr</option>
                <option value='10:00 Uhr'>10:00 Uhr</option>
                <option value='11:00 Uhr'>11:00 Uhr</option>
                <option value='12:00 Uhr'>12:00 Uhr</option>
                <option value='13:00 Uhr'>13:00 Uhr</option>
                <option value='14:00 Uhr'>14:00 Uhr</option>
                <option value='15:00 Uhr'>15:00 Uhr</option>
                <option value='16:00 Uhr'>16:00 Uhr</option>
                <option value='17:00 Uhr'>17:00 Uhr</option>
                <option value='18:00 Uhr'>18:00 Uhr</option>
                <option value='19:00 Uhr'>19:00 Uhr</option>
                <option value='20:00 Uhr'>20:00 Uhr</option>
                <option value='21:00 Uhr'>21:00 Uhr</option>
                <option value='22:00 Uhr'>22:00 Uhr</option>
                <option value='23:00 Uhr'>23:00 Uhr</option>
                <option value='24:00 Uhr'>24:00 Uhr</option>
              </select>
            </div>
            <div></div>
          </div>
          <div className='flex-grow flex justify-end items-end'>
            <button
              onClick={() => {
                const data = input as CreateRoutineInput;
                console.log(data);
                handleCreateRoutine(data);
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
