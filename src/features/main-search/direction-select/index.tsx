import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Direction } from 'shared/utils/types';
import { useInfiniteDirectionScroll } from 'shared/utils/hooks/use-infinite-direction-scroll';
import { useInView } from 'react-intersection-observer';
import { isEmpty } from 'shared/utils/libs';

interface DirectionSelectProps {
  direction: Direction | null;
  setDirection: (direction: Direction | null) => void;
}
export const DirectionSelect = ({ direction, setDirection }: DirectionSelectProps) => {
  const { ref, inView } = useInView();
  const [inputValue, setInputValue] = useState('');
  const { data, isLoading, hasNextPage, fetchNextPage, isSuccess } = useInfiniteDirectionScroll({
    filter: {
      name: isEmpty(inputValue) ? null : inputValue,
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const content =
    isSuccess &&
    data.pages
      .map((page) =>
        page.items.map((direction, index) => {
          if (page.items.length === index + 1) {
            return (
              <Combobox.Option
                ref={ref}
                key={direction.id}
                value={direction}
                className='w-full cursor-pointer py-2 font-medium'
                onClick={() => setInputValue(direction.name)}
              >
                {direction.name}
              </Combobox.Option>
            );
          }
          return (
            <Combobox.Option
              key={direction.id}
              value={direction}
              className='w-full cursor-pointer py-2 font-medium'
              onClick={() => setInputValue(direction.name)}
            >
              {direction.name}
            </Combobox.Option>
          );
        }),
      )
      .flat();

  return (
    <div className='relative flex w-full gap-x-4'>
      <div className='aspect-square rounded-full border border-zinc-300 bg-white p-2'>
        <FmdGoodOutlinedIcon />
      </div>
      <Combobox value={direction} onChange={setDirection}>
        <Combobox.Button className='cursor-default'>
          <Combobox.Input
            autoComplete='off'
            placeholder='Виберіть напрямок'
            className='w-full text-base font-medium text-neutral-500 outline-none'
            displayValue={(direction: Direction | null) => direction?.name || ''}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </Combobox.Button>
        <Combobox.Options className='no-scrollbar origin-to-left absolute left-0 top-full z-20 mt-1 inline-flex max-h-56 w-full flex-col items-start justify-start divide-y divide-gray-200 overflow-auto rounded-md bg-white px-5 py-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none'>
          {isLoading && (
            <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
              Loading...
            </div>
          )}
          {data?.pages[0].totalItems === 0 && inputValue === '' && (
            <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
              Nothing to select
            </div>
          )}
          {data?.pages[0].totalItems === 0 && inputValue !== '' ? (
            <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
              Nothing found
            </div>
          ) : (
            content
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
