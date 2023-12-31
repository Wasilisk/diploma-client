import { Button } from 'shared/ui/button';
import { TourCard } from 'entities/tour/ui/tour-card';
import { Link } from 'react-router-dom';
import { useTours } from 'shared/utils/hooks/use-tours';
import { useFilters } from 'shared/utils/hooks/use-filters';
import { Filters } from 'widgets/filters';
import { ContentState } from 'shared/ui/content-state';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';

export const ToursSection = () => {
  const { direction } = useFilters();
  const {
    data: tours,
    isLoading,
    isError,
    refetch,
  } = useTours({
    directionId: direction?.id,
    paginationParams: { page: 0, size: 6 },
  });

  const contentStateValue = parseContentState(isLoading, isError, isEmpty(tours?.items));

  return (
    <div className='my-10 md:mt-20'>
      <div className='flex justify-between'>
        <h6 className='text-4xl font-extrabold'>Екскурсії</h6>
        <Link to={direction?.id ? `/direction/${direction?.id}` : '/tours'}>
          <Button variant='primary'>
            Всі екскурсії
          </Button>
        </Link>
      </div>
      <Filters
        filtersVisible={{
          paymentType: false,
          priceRange: false,
          tourType: false,
          direction: true,
          dateRange: true,
        }}
      />
      <ContentState
        state={contentStateValue}
        loadingPlaceholderComponent={
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
            {Array.from({ length: 8 }).map(() => (
              <div className='flex h-36 w-full animate-pulse rounded-2xl bg-gray-200' />
            ))}
          </div>
        }
        onReload={refetch}
      >
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
          {tours?.items.map((tour) => <TourCard tour={tour} key={tour.id} />)}
        </div>
      </ContentState>
    </div>
  );
};
