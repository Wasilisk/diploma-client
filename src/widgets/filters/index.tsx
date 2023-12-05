import { DateRangeFilter, SelectorFilter } from 'shared/ui/filters';
import { useFilters } from 'shared/utils/hooks/use-filters';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { prices, tourTypes } from 'shared/utils/constants';
import { FilterTypes } from 'shared/utils/types';

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
  const { data: directions } = useDirections();

  return (
    <div className='my-4 flex flex-wrap gap-x-8 gap-y-2 border-y border-zinc-100 py-2 md:py-4'>
      {filtersVisible.direction && (
        <SelectorFilter
          value={directionValue}
          onChange={setDirection}
          label='Напрямок'
          placeholder='Усі напрямки'
          items={directions}
          renderItemValue={(item) => item.name}
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
