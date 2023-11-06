import { DirectionCard } from 'entities/direction/ui/direction-card';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { Button } from 'shared/ui/button';
import { DirectionCardSkeleton } from 'entities/direction/ui/direction-card-skeleton';
import { Link } from 'react-router-dom';

export const PopularDirections = () => {
  const { data: directions } = useDirections();

  return (
    <div className='my-10 md:mt-20'>
      <h6 className='text-4xl font-extrabold'>Популярні напрямки</h6>
      <p className='mb-6 mt-4'>
        Проводимо індивідуальні та групові екскурсії українською та англійськими мовами
      </p>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8'>
        {directions
          ? directions.slice(0, 6).map((direction) => (
              <DirectionCard
                key={direction.id}
                name={direction.name}
                image={direction.image}
                action={
                  <Link to={`/direction/${direction.id}`} className='w-fit'>
                    <Button rounded className='px-2 py-1 md:px-2 md:py-1' variant='primary'>
                      Екскурсій: {direction._count.tours}
                    </Button>
                  </Link>
                }
              />
            ))
          : Array.from({ length: 6 }).map((_, index) => <DirectionCardSkeleton key={index} />)}
      </div>
    </div>
  );
};
