import { Button } from 'shared/ui/button';
import { TourCard } from 'entities/tour/ui/tour-card';
import { Link } from 'react-router-dom';
import { DateRangeFilter } from 'shared/ui/filters/date-range-filter';
import { SelectorFilter } from 'shared/ui/filters';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { useState } from 'react';

export const ToursSection = () => {
  const { data: directions } = useDirections();
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);

  return (
    <div className='my-10 md:mt-20'>
      <h6 className='text-4xl font-extrabold'>Екскурсії</h6>
      <div className='my-4 flex flex-wrap gap-x-4 gap-y-2 border-y border-zinc-100 py-2 md:py-4'>
        <DateRangeFilter label='Дата' />
        <SelectorFilter
          value={selectedDirection}
          onChange={setSelectedDirection}
          label='Напрямок'
          placeholder='Усі напрямки'
          items={directions}
          renderItemValue={(item) => item.name}
        />
      </div>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
        {Array.from({ length: 8 }).map((_, index) => (
          <TourCard key={index} />
        ))}
      </div>
      <div className='flex justify-center'>
        <Link className='mt-8 md:mt-16' to='any'>
          <Button variant='primary' rounded>
            Всі екскурсії
          </Button>
        </Link>
      </div>
    </div>
  );
};
