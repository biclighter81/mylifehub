import { KeyedMutator } from 'swr';
import { Goal } from '../../lib/types/goal';
import ProgressGauge from '../app/ProgressGauge';
import dayjs from 'dayjs';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

export default function GoalDashboard({
  data,
  mutate,
}: {
  data: Goal[];
  mutate: KeyedMutator<Goal[]>;
}) {
  const { data: session } = useSession();

  async function handleIncreaseCompletion(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/goal/increase/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.access_token,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = (await res.json()) as Goal;
      mutate((goals) => {
        if (!goals) return [data];
        return goals.map((goal) => {
          if (goal.id === data.id) {
            return data;
          }
          return goal;
        });
      }, false);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDecreaseCompletion(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/goal/decrease/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + session?.access_token,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = (await res.json()) as Goal;
      mutate((goals) => {
        if (!goals) return [data];
        return goals.map((goal) => {
          if (goal.id === data.id) {
            return data;
          }
          return goal;
        });
      }, false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1 className='mt-8 text-xl font-bold text-gray-600'>Goals</h1>
      <p className='text-xs text-gray-600 -mt-1'>
        These are your current goals
      </p>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {data.map((goal) => {
          const currentCompletion = goal.completions.find(
            (c) =>
              dayjs(c.date).format('YYYY-MM-DD') ===
              dayjs().format('YYYY-MM-DD')
          );
          return (
            <div
              key={goal.id}
              className='bg-gray-200 px-12 py-12 rounded-md flex flex-col items-center justify-center relative'
            >
              {currentCompletion?.current === goal.goal && (
                <div className='absolute top-0 left-0 h-full w-1 bg-green-500 rounded-l-md' />
              )}
              <h3 className='font-bold text-primary-500 text-2xl mb-2'>
                {goal.name}
              </h3>
              <p className='text-gray-600 text-xs'>
                {goal.goal} {goal.unit}
              </p>
              <div className='flex space-x-4 items-center'>
                <IconMinus
                  className='text-gray-500 cursor-pointer'
                  onClick={() => {
                    if (currentCompletion?.current === 0) return;
                    handleDecreaseCompletion(goal.id);
                  }}
                />
                <ProgressGauge
                  progress={
                    currentCompletion
                      ? (currentCompletion.current / goal.goal) * 100
                      : 0
                  }
                  child={
                    <p className='text-xs text-gray-600'>
                      {currentCompletion?.current || 0} / {goal.goal}
                    </p>
                  }
                />
                <IconPlus
                  className='text-primary-500 cursor-pointer'
                  onClick={() => {
                    if (currentCompletion?.current === goal.goal) return;
                    handleIncreaseCompletion(goal.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
