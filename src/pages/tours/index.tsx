import { TourCard } from 'entities/tour/ui/tour-card';
import { useTours } from 'shared/utils/hooks/use-tours';
import { Filters } from 'widgets/filters';

export const Tours = () => {
  const { data: tours } = useTours({ paginationParams: { page: 0, size: 20 } });

  return (
    <>
      <div className='my-10 space-y-5'>
        <h2 className='text-5xl font-bold leading-10 text-neutral-800'>Усі екскурсії</h2>
        <p>Загальна кількість екскурсій: {tours?.totalItems}</p>
      </div>
      <Filters />
      <div className='mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
        {tours?.items.map((tour) => <TourCard tour={tour} key={tour.id} />)}
      </div>
    </>
  );
};
