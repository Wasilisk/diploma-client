import { Button } from 'shared/ui/button';
import { TourCard } from 'entities/tour/ui/tour-card';
import { Link } from 'react-router-dom';
import { useTours } from 'shared/utils/hooks/use-tours';
import { useFilters } from 'shared/utils/hooks/use-filters';
import { Filters } from 'widgets/filters';

export const ToursSection = () => {
  const { direction } = useFilters();
  const { data: tours } = useTours({
    directionId: direction?.id,
    paginationParams: { page: 0, size: 6 },
  });

  return (
    <div className='my-10 md:mt-20'>
      <h6 className='text-4xl font-extrabold'>Екскурсії</h6>
      <Filters
        filtersVisible={{
          paymentType: false,
          priceRange: false,
          tourType: false,
          direction: true,
          dateRange: true,
        }}
      />
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
        {tours?.items.map((tour) => <TourCard tour={tour} key={tour.id} />)}
      </div>
      <div className='flex justify-center'>
        <Link
          className='mt-8 md:mt-16'
          to={direction?.id ? `/direction/${direction?.id}` : '/tours'}
        >
          <Button variant='primary' rounded>
            Всі екскурсії
          </Button>
        </Link>
      </div>
    </div>
  );
};
