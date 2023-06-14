import { useMemo, useState } from 'react';
import { Routine } from '../../lib/types/routine';
import { IconCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { KeyedMutator } from 'swr';
import { useSession } from 'next-auth/react';

export default function RoutineDashboard({
  data,
  mutate,
}: {
  data: Routine[];
  mutate: KeyedMutator<Routine[]>;
}) {
  const [expanded, setExpanded] = useState<string>();
  const { data: session } = useSession();

  const routines = useMemo(() => {
    if (!data) return [];
    const truncStr = dayjs().format('YYYY-MM-DD');
    let routines = data.map((routine) => {
      const next = dayjs(
        truncStr + routine.preferredTime.replace(' Uhr', '')
      ).unix();
      return {
        ...routine,
        next,
      };
    });
    const completions = routines
      .flatMap((routine) => routine.stages)
      .flatMap((stage) => stage.completions);
    //return only the stages that are not completed
    routines = routines.map((routine) => {
      routine.stages = routine.stages.filter(
        (stage) =>
          !completions.find(
            (c) =>
              c &&
              c.stageId === stage.id &&
              dayjs(c.completedAt).format('YYYY-MM-DD') === truncStr
          )
      );
      return routine;
    });
    return routines.sort((a, b) => a.next - b.next);
  }, [data]);

  function isCompleted(routine: Routine) {
    return routine.stages.every((stage) =>
      stage.completions.find(
        (c) =>
          dayjs(c.completedAt).format('YYYY-MM-DD') ===
          dayjs().format('YYYY-MM-DD')
      )
    );
  }

  async function handleResetRoutine(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/routine/${id}/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      if (!res.ok) throw new Error('Error resetting routine');
      mutate(data, true);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCompleteStage(id: string) {
    try {
      mutate(
        routines.map((routine) => {
          routine.stages = routine.stages.filter((stage) => stage.id !== id);
          return routine;
        }),
        false
      );
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/routine/stages/${id}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      if (!res.ok) throw new Error('Error completing stage');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='flex flex-col mt-8 space-y-4'>
        {routines.length === 0 && (
          <div className='text-center'>
            <h2 className='font-bold text-gray-600'>
              Yey, you are set! Nothing to do for today!
            </h2>
          </div>
        )}
        {routines.map((routine) => (
          <div key={routine.id} className='flex flex-col space-y-4'>
            <div className='bg-gray-200 px-8 py-4 rounded-md relative'>
              {isCompleted(routine) && (
                <div className='absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-md'></div>
              )}
              <div className='flex items-center space-x-2'>
                <div className='text-gray-600 text-sm'>
                  {routine.preferredTime}
                </div>
                <div className='text-gray-600 text-sm'>{routine.name}</div>
                {isCompleted(routine) && (
                  <div className='flex-grow flex justify-end'>
                    <IconCheck
                      className='text-green-500 hover:scale-110 transition-all duration-300 hover:cursor-pointer'
                      onClick={() => handleResetRoutine(routine.id)}
                    />
                  </div>
                )}
              </div>
            </div>
            {routine.stages?.length > 0 && (
              <div className='flex space-x-4 items-start'>
                <button
                  className='rounded-md outline-none bg-primary-500 text-white px-4 py-2 min-h-[55px]'
                  onClick={() =>
                    setExpanded(
                      expanded === routine.id ? undefined : routine.id
                    )
                  }
                >
                  <div className='flex space-x-2'>
                    {expanded === routine.id ? (
                      <IconChevronUp className='h-5 w-5 ' />
                    ) : (
                      <IconChevronDown className='h-5 w-5' />
                    )}
                    <div className='text-sm'>Expand upcoming</div>
                  </div>
                </button>
                <div className='flex flex-col flex-grow space-y-4'>
                  <div
                    className='flex-grow bg-gray-200 px-8 py-4 rounded-md relative transition-opacity duration-1000 opacity-100'
                    id={routine.stages[0].id}
                  >
                    <div className='absolute top-0 left-0 w-1 h-full bg-primary-500 rounded-l-md'></div>
                    <div className='flex items-center space-x-2'>
                      <div className='text-gray-600 text-sm'>
                        {routine.stages[0].name}
                      </div>
                      <div className='flex flex-grow items-center justify-end'>
                        <IconCheck
                          className='text-primary-500'
                          onClick={() => {
                            const element = document.getElementById(
                              routine.stages[0].id
                            );
                            if (element) {
                              element.style.opacity = '0';
                              setTimeout(() => {
                                handleCompleteStage(routine.stages[0].id);
                                element.style.opacity = '100';
                              }, 1000);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {expanded === routine.id &&
                    routine.stages
                      .filter((s) => routine.stages.indexOf(s) > 0)
                      .map((stage) => (
                        <div
                          key={stage.id}
                          className='flex items-center space-x-4 flex-grow bg-gray-200 px-8 py-4 rounded-md min-h-[50px]'
                        >
                          <div className='flex items-center space-x-2'>
                            <div className='text-gray-600 text-sm'>
                              {stage.name}
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
