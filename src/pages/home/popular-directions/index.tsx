import { DirectionCard } from 'entities/direction/ui/direction-card';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { Button } from 'shared/ui/button';
import { DirectionCardSkeleton } from 'entities/direction/ui/direction-card-skeleton';
import { Link } from 'react-router-dom';
import { ContentState } from 'shared/ui/content-state';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';

export const PopularDirections = () => {
  const {
    data: directions,
    isError,
    isLoading,
    refetch,
  } = useDirections({ paginationParams: { size: 6, page: 0 }, sort: { tours: 'desc' } });

  const contentStateValue = parseContentState(isLoading, isError, isEmpty(directions));

  return (
    <div className='mt-20'>
        <div className='flex justify-between'>
            <h6 className='text-4xl font-extrabold'>Популярні напрямки</h6>
            <Link to={'/directions'}>
                <Button variant='primary'>
                    Всі напрямки
                </Button>
            </Link>
        </div>
      <p className='mb-6 mt-4'>
        Проводимо індивідуальні та групові екскурсії українською та англійськими мовами
      </p>
      <ContentState
        state={contentStateValue}
        loadingPlaceholderComponent={
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8'>
            {Array.from({ length: 6 }).map((_, index) => (
              <DirectionCardSkeleton key={index} />
            ))}
          </div>
        }
        onReload={refetch}
      >
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8'>
          {directions?.items.slice(0, 6).map((direction) => (
            <DirectionCard
              key={direction.id}
              name={direction.name}
              image={direction.image}
              contentAction={
                <Link to={`/tours?directionId=${direction.id}`} className='w-fit'>
                  <Button tabIndex={-1} className='px-2 py-1 md:px-2 md:py-1' variant='primary'>
                    Екскурсій: {direction._count.tours}
                  </Button>
                </Link>
              }
            />
          ))}
        </div>
      </ContentState>
    </div>
  );
};
