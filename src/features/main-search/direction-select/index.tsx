import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { Direction } from 'shared/utils/types';

interface DirectionSelectProps {
  direction: Direction | null;
  setDirection: (direction: Direction | null) => void;
}
export const DirectionSelect = ({ direction, setDirection }: DirectionSelectProps) => {
  const { data: directions, isLoading } = useDirections();
  const [inputValue, setInputValue] = useState('');

  const filteredDirections =
    inputValue === ''
      ? directions
      : directions?.filter((direction) => {
          return direction.name.toLowerCase().includes(inputValue.toLowerCase());
        });

  return (
    <div className='relative flex w-full gap-x-4'>
      <div className='aspect-square rounded-full border border-zinc-300 bg-white p-2'>
        <FmdGoodOutlinedIcon />
      </div>
      <Combobox value={direction} onChange={setDirection} disabled={isLoading}>
        <Combobox.Button className='cursor-default'>
          <Combobox.Input
            autoComplete='off'
            placeholder='Виберіть напрямок'
            className='w-full text-base font-medium text-neutral-500 outline-none'
            displayValue={(direction: Direction | null) => direction?.name || ''}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </Combobox.Button>
        <Combobox.Options className='no-scrollbar origin-to-left absolute left-0 top-full z-20 mt-1 inline-flex max-h-60 w-full flex-col items-start justify-start divide-y divide-gray-200 overflow-auto rounded-md bg-white px-5 py-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none'>
          {filteredDirections?.length === 0 && inputValue !== '' ? (
            <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
              Nothing found.
            </div>
          ) : (
            filteredDirections?.map((direction) => (
              <Combobox.Option
                key={direction.id}
                value={direction}
                className='w-full cursor-pointer py-2 font-medium'
                onClick={() => setInputValue(direction.name)}
              >
                {direction.name}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
