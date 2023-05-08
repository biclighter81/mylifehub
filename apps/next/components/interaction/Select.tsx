import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useState } from 'react';

export default function Select({
  values,
  selected,
  setSelected,
}: {
  values: { label: string; value: string }[];
  selected: { label: string; value: string } | undefined;
  setSelected: Dispatch<
    SetStateAction<{ label: string; value: string } | undefined>
  >;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className={`bg-gray-300 rounded-lg ${
          isOpen ? 'rounded-b-none' : ''
        } px-4 py-4 flex justify-between`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className='text-gray-600 font-medium'>{selected?.label}</span>
        <div>
          {!isOpen ? (
            <IconChevronDown className='text-gray-600' />
          ) : (
            <IconChevronUp className='text-gray-600' />
          )}
        </div>
      </div>
      {isOpen && (
        <div className='bg-gray-300 rounded-b-lg flex flex-col space-y-5 pb-4 pt-2'>
          {values
            .filter((v) => v.value != selected?.value)
            .map((v) => (
              <div
                key={v.value}
                className='px-4 '
                onClick={() => {
                  setSelected(v);
                  setIsOpen(false);
                }}
              >
                <span className='text-gray-600'>{v.label}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
