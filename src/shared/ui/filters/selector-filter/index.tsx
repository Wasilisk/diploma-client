import { Listbox } from '@headlessui/react';
import { FilterChip } from 'shared/ui/filters/filter-chip';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReactElement } from 'react';

interface SelectorFilterProps<T> {
  label: string;
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  items: T[];
  renderItemValue: (item: T) => string;
  disabled?: boolean;
  render?: (item: T, index: number) => ReactElement;
}

export const SelectorFilter = <T,>({
  label,
  value,
  onChange,
  placeholder,
  items,
  disabled = false,
  renderItemValue,
  render,
}: SelectorFilterProps<T>) => {
  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
      <div className='font-medium leading-relaxed text-zinc-700'>{label}</div>
      <Listbox as='div' value={value} onChange={onChange} className='relative' disabled={disabled}>
        {({ open }) => (
          <>
            <Listbox.Button as={FilterChip}>
              <div className='flex gap-x-2'>
                <p>{value ? renderItemValue(value) : placeholder}</p>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </div>
            </Listbox.Button>
            <Listbox.Options className='origin-to-left no-scrollbar absolute left-0 top-full z-20 mt-2 inline-flex max-h-56 min-w-full flex-col items-start justify-start divide-y divide-gray-200 overflow-auto rounded-md bg-white px-6 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {placeholder && (
                <Listbox.Option
                  value={null}
                  className='w-full cursor-pointer whitespace-nowrap py-2 font-medium'
                >
                  {placeholder}
                </Listbox.Option>
              )}
              {render
                ? items?.map((item, index) => render(item, index))
                : items?.map((item, index) => {
                    const optionValue = renderItemValue(item);
                    return (
                      <Listbox.Option
                        key={index}
                        value={item}
                        className='w-full cursor-pointer whitespace-nowrap py-2 font-medium'
                      >
                        {optionValue}
                      </Listbox.Option>
                    );
                  })}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
};
