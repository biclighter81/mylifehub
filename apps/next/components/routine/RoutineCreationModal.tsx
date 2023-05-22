import { IconX } from '@tabler/icons-react';

export default function RoutineCreationModal({
  setActive,
}: {
  setActive: (active: boolean) => void;
}) {
  return (
    <>
      <div
        className='absolute top-0 left-0 flex w-full h-full bg-black bg-opacity-20 items-center justify-center'
        onClick={() => {
          setActive(false);
        }}
      >
        <div
          className='bg-white rounded-lg w-[700px] h-[500px] px-12 py-12'
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
              ></input>
            </div>
            <div className='flex flex-col space-y-1'>
              <label className='text-xs text-gray-500'>Beschreibung</label>
              <textarea
                placeholder='Routine description...'
                className='bg-gray-200 px-4 py-3 text-xs rounded-lg text-gray-600 placeholder-gray-600 outline-none border-none fill-none resize-none'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
