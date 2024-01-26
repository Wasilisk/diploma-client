import { DateRangeFilter, SelectorFilter } from 'shared/ui/filters';
import { useFilters } from 'shared/utils/hooks/use-filters';
import { Direction, FilterTypes } from 'shared/utils/types';
import { useInfiniteDirectionScroll } from 'shared/utils/hooks/use-infinite-direction-scroll';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';
import { MultiRangeFilter } from 'shared/ui/filters/multi-range-filter';
interface FiltersProps {
  filtersVisible?: Partial<Record<FilterTypes, boolean>>;
}

export const Filters = ({
  filtersVisible = {
    direction: true,
    dateRange: true,
    priceRange: true,
    groupSize: true,
  },
}: FiltersProps) => {
  const {
    direction: directionValue,
    groupSize: groupSizeValue,
    priceRange: priceRangeValue,
    dateRange: dateRangeValue,
    setDateRange,
    setDirection,
    setGroupSize,
    setPriceRange,
  } = useFilters();
  const { ref, inView } = useInView();
  const [, setSearchParams] = useSearchParams();
  const { data, hasNextPage, fetchNextPage } = useInfiniteDirectionScroll();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  const directionsItems = data?.pages.map((page) => page.items).flat() || [];

  const handleChangeDirection = (direction: Direction | null) => {
    setDirection(direction);
    setSearchParams((searchParams) => {
      direction
        ? searchParams.set('directionId', direction.id.toString())
        : searchParams.delete('directionId');
      return searchParams;
    });
  };
  return (
    <div className='my-4 flex flex-wrap gap-x-8 gap-y-2 border-y border-zinc-100 py-2 md:py-4'>
      {filtersVisible.direction && (
        <SelectorFilter
          value={directionValue}
          onChange={handleChangeDirection}
          label='Напрямок'
          placeholder='Усі напрямки'
          items={directionsItems}
          renderItemValue={(item) => item.name}
          render={(item, index) => {
            if (directionsItems.length === index + 1) {
              return (
                <Listbox.Option
                  ref={ref}
                  key={index}
                  value={item}
                  className='w-full cursor-pointer whitespace-nowrap py-2 font-medium'
                >
                  {item.name}
                </Listbox.Option>
              );
            }
            return (
              <Listbox.Option
                key={index}
                value={item}
                className='w-full cursor-pointer whitespace-nowrap py-2 font-medium'
              >
                {item.name}
              </Listbox.Option>
            );
          }}
        />
      )}
      {filtersVisible.dateRange && (
        <DateRangeFilter label='Дата' dateRange={dateRangeValue} setDateRange={setDateRange} />
      )}
      {filtersVisible.priceRange && (
        <MultiRangeFilter
          value={`${priceRangeValue.min} - ${priceRangeValue.max} ₴`}
          label={'Ціна:'}
          onChange={setPriceRange}
          step={100}
          min={0}
          max={5000}
        />
      )}
      {filtersVisible.groupSize && (
        <MultiRangeFilter
          value={`${groupSizeValue.min} - ${groupSizeValue.max} (чол)`}
          label={'Розмір групи:'}
          onChange={setGroupSize}
          step={1}
          min={0}
          max={50}
        />
      )}
    </div>
  );
};
