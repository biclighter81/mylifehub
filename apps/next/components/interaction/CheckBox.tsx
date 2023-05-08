import { IconCheck } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';

export default function CheckBox({
  id,
  selected,
  setSelected,
}: {
  id: string;
  selected: { id: string; checked: boolean }[];
  setSelected: Dispatch<
    SetStateAction<
      {
        id: string;
        checked: boolean;
      }[]
    >
  >;
}) {
  return (
    <div className='bg-white rounded-lg flex items-center justify-center  w-8 h-8'>
      {selected.find((s) => s.id == id)?.checked ? (
        <IconCheck className='text-primary-500' />
      ) : (
        <></>
      )}
    </div>
  );
}
