import { DateRangeFilter, SelectorFilter } from 'shared/ui/filters';
import { useFilters } from 'shared/utils/hooks/use-filters';
import { prices, tourTypes } from 'shared/utils/constants';
import {Direction, FilterTypes} from 'shared/utils/types';
import { useInfiniteDirectionScroll } from 'shared/utils/hooks/use-infinite-direction-scroll';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import {useSearchParams} from "react-router-dom";

interface FiltersProps {
  filtersVisible?: Partial<Record<FilterTypes, boolean>>;
}

export const Filters = ({
  filtersVisible = {
    direction: true,
    dateRange: true,
    priceRange: true,
    tourType: true,
  },
}: FiltersProps) => {
  const {
    direction: directionValue,
    tourType: tourTypeValue,
    priceRange: priceRangeValue,
    dateRange: dateRangeValue,
    setDateRange,
    setDirection,
    setPriceRange,
    setTourType,
  } = useFilters();
  const { ref, inView } = useInView();
  const [_, setSearchParams] = useSearchParams();
  const { data, hasNextPage, fetchNextPage } = useInfiniteDirectionScroll();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  const directionsItems = data?.pages.map((page) => page.items).flat() || [];

  const handleChangeDirection = (direction: Direction | null) => {
    setDirection(direction)
    if (direction) {
      setSearchParams((searchParams) => {
        searchParams.set('directionId', direction.id.toString());
        return searchParams;
      });
    } else {
      setSearchParams((searchParams) => {
        searchParams.delete('directionId');
        return searchParams;
      });
    }
  }
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
        <SelectorFilter
          value={priceRangeValue}
          onChange={setPriceRange}
          label='Ціна'
          placeholder='Не вказано'
          items={prices}
          renderItemValue={(price) => price.label}
        />
      )}
      {filtersVisible.tourType && (
        <SelectorFilter
          value={tourTypeValue}
          onChange={setTourType}
          label='Тип екскурсії'
          placeholder='Не вказано'
          items={tourTypes}
          renderItemValue={(item) => item.label}
        />
      )}
    </div>
  );
};
