import React from 'react';

export default function ProgressGauge({
  progress,
  child,
}: {
  progress: number;
  child?: React.ReactNode;
}) {
  const pct = ((100 - progress) / 100) * Math.PI * (90 * 2);
  return (
    <>
      <div className='block mx-2 my-2 rounded-full relative w-16 h-16'>
        <div className='absolute left-0 right-0 bottom-0 top-0 m-auto w-fit h-fit'>
          {child}
        </div>
        <svg
          id='svg'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 200 200'
        >
          <circle
            r='90'
            cx='100'
            cy='100'
            fill='transparent'
            strokeDasharray='565.48'
            strokeDashoffset={'0'}
            strokeWidth={'1rem'}
            stroke='#cbd5e1'
          ></circle>
          <circle
            id='bar'
            r='90'
            cx='100'
            cy='100'
            fill='transparent'
            strokeDasharray='565.48'
            strokeWidth={'1rem'}
            stroke='#3b82f6'
            strokeDashoffset={pct}
          ></circle>
        </svg>
      </div>
    </>
  );
}
