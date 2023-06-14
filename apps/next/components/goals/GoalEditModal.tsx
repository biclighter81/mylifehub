import { IconX } from '@tabler/icons-react';

export default function GoalEditModal({
  setActive,
  id,
}: {
  setActive: (active: string | undefined) => void;
  id: string;
}) {
  return (
    <>
      <div
        className='absolute top-0 left-0 flex w-full h-full bg-black bg-opacity-20 items-center justify-center z-10'
        onClick={() => {
          setActive(undefined);
        }}
      >
        <div
          className='bg-white rounded-lg w-[700px] h-[500px] px-12 py-12 flex flex-col'
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

          <div className='mt-4 flex flex-col space-y-4'></div>
        </div>
      </div>
    </>
  );
}
