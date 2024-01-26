import { Popover } from '@headlessui/react';
import MultiRangeSlider from 'shared/ui/multi-range-slider';
import { NumericRange } from 'shared/ui/multi-range-slider/types';

interface MultiRangeFilterProps extends NumericRange {
  value: string;
  label: string;
  onChange: (value: NumericRange) => void;
  step?: number;
}
export const MultiRangeFilter = ({
  min,
  max,
  value,
  label,
  step,
  onChange,
}: MultiRangeFilterProps) => {
  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
      <div className='font-medium leading-relaxed text-zinc-700'>{label}</div>
      <Popover className='relative'>
        <Popover.Button
          as={'button'}
          className='relative w-fit rounded-full bg-neutral-100 px-3 py-2 outline-none'
        >
          {value}
        </Popover.Button>

        <Popover.Panel className='absolute left-0 top-full z-20 mt-2 inline-flex h-8 max-h-56 min-w-full items-center rounded-md bg-white p-2 p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <MultiRangeSlider min={min} max={max} onChange={onChange} step={step} />
        </Popover.Panel>
      </Popover>
    </div>
  );
};
